"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { io, type Socket } from "socket.io-client";
import type { EmojiClickData, Theme } from "emoji-picker-react";
import {
  FileText,
  ImageIcon,
  Loader2,
  Paperclip,
  SendHorizontal,
  Smile,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const inputClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

const queryClient = new QueryClient();

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  accessToken: string;
};

type ChatUser = {
  _id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  profileImage?: string;
  status?: string;
};

type ChatAttachment = {
  type: "image" | "pdf";
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

type ChatMessage = {
  _id: string;
  senderId: string | ChatUser;
  receiverId: string | ChatUser;
  text?: string;
  attachments?: ChatAttachment[];
  readAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type ApiResponse<T> = {
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  data?: T;
};

type ChangePasswordResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

type EmojiPickerPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function getChangePasswordUrl(apiBaseUrl: string) {
  const baseUrl = apiBaseUrl.replace(/\/+$/, "");

  if (baseUrl.endsWith("/api/v1")) {
    return `${baseUrl}/auth/change-password`;
  }

  return `${baseUrl}/api/v1/auth/change-password`;
}

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

function getSocketBaseUrl(apiBaseUrl: string) {
  return apiBaseUrl.replace(/\/api\/v1\/?$/, "");
}

function getParticipantId(participant: string | ChatUser | undefined) {
  if (!participant) return "";
  return typeof participant === "string" ? participant : participant._id ?? "";
}

function getParticipantName(user?: ChatUser | null) {
  return user?.fullName?.trim() || user?.email || "Admin";
}

function formatChatTime(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function fetchChatJson<T>(
  path: string,
  accessToken: string,
  init?: RequestInit
) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
  });
  const data: ApiResponse<T> | null = await response.json().catch(() => null);

  if (!response.ok || data?.success === false || data?.status === false) {
    throw new Error(data?.message || data?.error || "Chat request failed.");
  }

  return data?.data as T;
}

async function sendChatMessage({
  text,
  files,
  accessToken,
}: {
  text: string;
  files: File[];
  accessToken: string;
}) {
  const formData = new FormData();
  const trimmedText = text.trim();

  if (trimmedText) {
    formData.append("text", trimmedText);
  }

  files.forEach((file) => {
    formData.append("attachments", file);
  });

  return fetchChatJson<ChatMessage>("/chat/messages", accessToken, {
    method: "POST",
    body: formData,
  });
}

async function changePassword({
  oldPassword,
  newPassword,
  accessToken,
}: ChangePasswordPayload) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(getChangePasswordUrl(apiBaseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });
  const data: ChangePasswordResponse | null = await response
    .json()
    .catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || data?.error || "Failed to change password.");
  }

  return data;
}

export function MessagesPanel() {
  const { data: session, status } = useSession();
  const [supportUser, setSupportUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [emojiPickerPosition, setEmojiPickerPosition] =
    useState<EmojiPickerPosition | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const accessToken = session?.accessToken;
  const currentUserId = session?.user?._id ?? session?.user?.userId ?? "";
  const supportUserId = supportUser?._id ?? "";
  const canSend =
    Boolean(accessToken) &&
    !isSending &&
    (messageText.trim().length > 0 || selectedFiles.length > 0);

  const scrollToLatestMessage = useCallback((behavior: ScrollBehavior = "smooth") => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    requestAnimationFrame(() => {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior,
      });
    });
  }, []);

  const updateEmojiPickerPosition = useCallback(() => {
    const button = emojiButtonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();
    const width = Math.min(300, window.innerWidth - 32);
    const height = Math.min(360, window.innerHeight - 32);
    const left = Math.min(
      Math.max(16, rect.right - width),
      window.innerWidth - width - 16
    );
    const top = Math.max(16, rect.top - height - 12);

    setEmojiPickerPosition({ top, left, width, height });
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;
    const originalBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.classList.add("profile-messages-active");

    return () => {
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
      body.style.overscrollBehavior = originalBodyOverscroll;
      body.classList.remove("profile-messages-active");
    };
  }, []);

  useEffect(() => {
    if (!isEmojiPickerOpen) return;

    updateEmojiPickerPosition();

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedPicker = emojiPickerRef.current?.contains(target);
      const clickedButton = emojiButtonRef.current?.contains(target);

      if (!clickedPicker && !clickedButton) {
        setIsEmojiPickerOpen(false);
      }
    };

    const handleViewportChange = () => {
      updateEmojiPickerPosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isEmojiPickerOpen, updateEmojiPickerPosition]);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const handleWheel = (event: WheelEvent) => {
      const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;

      if (maxScrollTop <= 0) return;

      const delta = event.deltaY || event.deltaX;

      if (!delta) return;

      event.preventDefault();
      event.stopPropagation();
      scrollElement.scrollTop = Math.min(
        Math.max(scrollElement.scrollTop + delta, 0),
        maxScrollTop
      );
    };

    scrollElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!isEmojiPickerOpen) {
      setEmojiPickerPosition(null);
    }
  }, [isEmojiPickerOpen]);

  useEffect(() => {
    if (status === "loading") return;

    if (!accessToken) {
      setIsLoadingChat(false);
      setChatError("Please login to chat with admin.");
      return;
    }

    let ignore = false;
    const token = accessToken;

    async function loadChat() {
      setIsLoadingChat(true);
      setChatError(null);

      try {
        const [support, history] = await Promise.all([
          fetchChatJson<ChatUser>("/chat/support", token),
          fetchChatJson<ChatMessage[]>("/chat/messages?limit=200", token),
        ]);

        if (ignore) return;

        setSupportUser(support);
        setMessages(history ?? []);

        void fetchChatJson("/chat/read", token, {
          method: "PATCH",
        }).catch(() => null);
      } catch (error) {
        if (ignore) return;
        setChatError(
          error instanceof Error ? error.message : "Failed to load chat."
        );
      } finally {
        if (!ignore) setIsLoadingChat(false);
      }
    }

    void loadChat();

    return () => {
      ignore = true;
    };
  }, [accessToken, status]);

  useEffect(() => {
    if (!accessToken || !currentUserId) return;

    const socket = io(`${getSocketBaseUrl(getApiBaseUrl())}/chat`, {
      auth: { token: accessToken },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("chat:ready", () => {
      setIsSocketReady(true);
      setChatError(null);
    });

    socket.on("message:new", (message: ChatMessage) => {
      const senderId = getParticipantId(message.senderId);
      const receiverId = getParticipantId(message.receiverId);
      const belongsToConversation =
        senderId === currentUserId ||
        receiverId === currentUserId ||
        senderId === supportUserId ||
        receiverId === supportUserId;

      if (!belongsToConversation) return;

      setMessages((current) => {
        if (current.some((item) => item._id === message._id)) return current;
        return [...current, message];
      });

      socket.emit("conversation:read", {});
    });

    socket.on("chat:error", (payload: { message?: string }) => {
      setChatError(payload?.message || "Realtime chat connection failed.");
    });

    socket.on("disconnect", () => {
      setIsSocketReady(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsSocketReady(false);
    };
  }, [accessToken, currentUserId, supportUserId]);

  useEffect(() => {
    scrollToLatestMessage(isLoadingChat ? "auto" : "smooth");
  }, [isLoadingChat, messages.length, scrollToLatestMessage]);

  const supportName = useMemo(() => getParticipantName(supportUser), [supportUser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const allowedFiles = files.filter((file) => {
      const isAllowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "application/pdf",
      ].includes(file.type);
      const isWithinLimit = file.size <= 10 * 1024 * 1024;

      if (!isAllowed) {
        toast.error(`${file.name} is not a supported attachment.`);
      }

      if (!isWithinLimit) {
        toast.error(`${file.name} is larger than 10 MB.`);
      }

      return isAllowed && isWithinLimit;
    });

    setSelectedFiles((current) => [...current, ...allowedFiles].slice(0, 5));
    event.target.value = "";
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((current) =>
      current.filter((file) => file.name !== fileName)
    );
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageText((current) => `${current}${emojiData.emoji}`);
    messageInputRef.current?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessToken) {
      toast.error("Please login to send a message.");
      return;
    }

    if (!canSend) return;

    setIsSending(true);
    setChatError(null);

    try {
      const savedMessage = await sendChatMessage({
        text: messageText,
        files: selectedFiles,
        accessToken,
      });

      setMessages((current) => {
        if (current.some((message) => message._id === savedMessage._id)) {
          return current;
        }

        return [...current, savedMessage];
      });
      setMessageText("");
      setSelectedFiles([]);
      setIsEmojiPickerOpen(false);
      scrollToLatestMessage();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Message could not be sent."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="flex h-[min(556px,calc(100vh-128px))] w-full flex-col overflow-hidden rounded-lg bg-[#191919] text-white lg:h-[70vh]">
      <div className="flex h-[60px] shrink-0 items-center gap-2.5 bg-[#333333] px-3.5 sm:h-[61px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={supportUser?.profilePicture || supportUser?.profileImage || "/Profile.png"}
          alt={supportName}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium leading-5 text-white">
            {supportName}
          </h2>
          <p className="text-xs leading-4 text-[#C9C9C9]">
            {isSocketReady ? "Active now" : "Connecting..."}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent
        data-lenis-prevent-touch
        data-lenis-prevent-wheel
        className="flex min-h-0 flex-1 touch-pan-y flex-col gap-2 overflow-y-auto overscroll-contain bg-[#191919] px-3.5 py-4"
      >
        {isLoadingChat ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#CFCFCF]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading chat...
          </div>
        ) : chatError ? (
          <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-[#F4B7B7]">
            {chatError}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-[#AFAFAF]">
            Start a conversation with admin.
          </div>
        ) : (
          messages.map((message) => {
            const isRight = getParticipantId(message.senderId) === currentUserId;

            return (
              <div
                key={message._id}
                className={`flex ${isRight ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[325px] rounded-[8px] px-3 py-2.5 text-[12px] font-light leading-[19px] text-[#D6D6D6] sm:text-[13px] ${
                    isRight ? "bg-[#5B5B5B]" : "bg-[#563203]"
                  }`}
                >
                  {message.text ? <p className="whitespace-pre-wrap break-words">{message.text}</p> : null}
                  {message.attachments?.length ? (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment) =>
                        attachment.type === "image" ? (
                          <a
                            key={attachment.url}
                            href={attachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block overflow-hidden rounded-md border border-white/10"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={attachment.url}
                              alt={attachment.originalName}
                              className="max-h-48 w-full object-cover"
                            />
                          </a>
                        ) : (
                          <a
                            key={attachment.url}
                            href={attachment.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-md border border-white/10 bg-black/15 px-2.5 py-2 text-[#F2D8A8] transition hover:bg-black/25"
                          >
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="truncate">{attachment.originalName}</span>
                          </a>
                        )
                      )}
                    </div>
                  ) : null}
                  {message.createdAt ? (
                    <p className="mt-1 text-right text-[10px] leading-4 text-white/50">
                      {formatChatTime(message.createdAt)}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedFiles.length ? (
        <div className="flex shrink-0 gap-2 overflow-x-auto bg-[#2B2B2B] px-3.5 py-2">
          {selectedFiles.map((file) => (
            <div
              key={file.name}
              className="flex max-w-[190px] shrink-0 items-center gap-2 rounded-md bg-[#3A3A3A] px-2.5 py-1.5 text-xs text-[#E6E6E6]"
            >
              {file.type === "application/pdf" ? (
                <FileText className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <ImageIcon className="h-3.5 w-3.5 shrink-0" />
              )}
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                className="text-[#CFCFCF] transition hover:text-white"
                onClick={() => handleRemoveFile(file.name)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <form
        className="relative flex h-[54px] shrink-0 items-center gap-3 bg-[#333333] px-3.5"
        onSubmit={handleSubmit}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          multiple
          onChange={handleFileChange}
        />
        <button
          type="button"
          aria-label="Attach file"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-[#D0D0D0] transition hover:text-white"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending || !accessToken}
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <input
          ref={messageInputRef}
          type="text"
          aria-label="Type a message"
          placeholder="Type a message..."
          className="min-w-0 flex-1 bg-transparent text-xs font-light text-white outline-none placeholder:text-[#CFCFCF] sm:text-sm"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          disabled={isSending || !accessToken}
        />

        <div className="relative shrink-0">
          <button
            ref={emojiButtonRef}
            type="button"
            aria-label="Choose emoji"
            className="flex h-8 w-8 shrink-0 items-center justify-center text-[#D0D0D0] transition hover:text-white"
            onClick={() => setIsEmojiPickerOpen((current) => !current)}
            disabled={isSending || !accessToken}
          >
            <Smile className="h-4 w-4" />
          </button>
        </div>
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C88719] text-white transition hover:bg-[#B47714]"
          disabled={!canSend}
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </button>
      </form>
      {isEmojiPickerOpen && emojiPickerPosition
        ? createPortal(
            <div
              ref={emojiPickerRef}
              className="overflow-hidden rounded-lg border border-white/10 bg-[#1F1F1F] shadow-2xl"
              style={{
                position: "fixed",
                top: emojiPickerPosition.top,
                left: emojiPickerPosition.left,
                width: emojiPickerPosition.width,
                zIndex: 100,
              }}
            >
              <EmojiPicker
                theme={"dark" as Theme}
                width="100%"
                height={emojiPickerPosition.height}
                lazyLoadEmojis
                previewConfig={{ showPreview: false }}
                onEmojiClick={handleEmojiClick}
              />
            </div>,
            document.body
          )
        : null}
    </section>
  );
}

function ChangePasswordForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully.");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to change password."
      );
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.accessToken) {
      toast.error("Please login to change your password.");
      return;
    }

    if (!formData.oldPassword || !formData.newPassword) {
      toast.error("Please enter your current and new password.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    changePasswordMutation.mutate({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      accessToken: session.accessToken,
    });
  };

  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <h2 className="text-[22px] font-semibold leading-tight sm:text-[28px]">
        Changes Password
      </h2>
      <p className="mt-1 text-sm font-light text-[#BDBDBD]">
        Update your account password.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5"
      >
        <label>
          <span className="mb-2 block text-sm font-normal text-white">
            Current Password
          </span>
          <input
            className={inputClass}
            type="password"
            name="oldPassword"
            placeholder="********"
            value={formData.oldPassword}
            onChange={handleChange}
            disabled={changePasswordMutation.isPending}
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-normal text-white">
            New Password
          </span>
          <input
            className={inputClass}
            type="password"
            name="newPassword"
            placeholder="********"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={changePasswordMutation.isPending}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-normal text-white">
            Confirm Password
          </span>
          <input
            className={inputClass}
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={changePasswordMutation.isPending}
          />
        </label>

        <div className="flex justify-end sm:col-span-2">
          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="h-10 rounded-full bg-[#C88719] px-8 text-sm text-white hover:bg-[#B47714]"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}

export function ChangePasswordPanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChangePasswordForm />
    </QueryClientProvider>
  );
}
