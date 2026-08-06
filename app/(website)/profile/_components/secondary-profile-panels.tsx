"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loader2, Paperclip, SendHorizontal, Smile } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const inputClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

const queryClient = new QueryClient();

const chatMessages = [
  {
    id: 1,
    align: "right",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "-mt-5",
  },
  {
    id: 2,
    align: "left",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "mt-2",
  },
  {
    id: 3,
    align: "right",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "mt-1",
  },
  {
    id: 4,
    align: "right",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "",
  },
  {
    id: 5,
    align: "left",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "mt-7",
  },
  {
    id: 6,
    align: "right",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "mt-1",
  },
];

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  accessToken: string;
};

type ChangePasswordResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

function getChangePasswordUrl(apiBaseUrl: string) {
  const baseUrl = apiBaseUrl.replace(/\/+$/, "");

  if (baseUrl.endsWith("/api/v1")) {
    return `${baseUrl}/auth/change-password`;
  }

  return `${baseUrl}/api/v1/auth/change-password`;
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

  return (
    <section className="flex h-[min(556px,calc(100vh-128px))] w-full flex-col overflow-hidden rounded-lg bg-[#191919] text-white lg:h-[700px]">
      <div className="flex h-[60px] shrink-0 items-center gap-2.5 bg-[#333333] px-3.5 sm:h-[61px]">
        <Image
          src="/Profile.png"
          alt="Admin"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium leading-5 text-white">
            Admin
          </h2>
          <p className="text-xs leading-4 text-[#C9C9C9]">Active</p>
        </div>
      </div>

      <div className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto bg-[#191919] px-3.5 py-4">
        {chatMessages.map((message) => {
          const isRight = message.align === "right";

          return (
            <div
              key={message.id}
              className={`flex ${isRight ? "justify-end" : "justify-start"} ${message.className}`}
            >
              <p
                className={`max-w-[325px] rounded-[8px] px-3 py-2.5 text-[12px] font-light leading-[19px] text-[#D6D6D6] sm:text-[13px] ${
                  isRight ? "bg-[#5B5B5B]" : "bg-[#563203]"
                }`}
              >
                {message.text}
              </p>
            </div>
          );
        })}
      </div>

      <form className="flex h-[54px] shrink-0 items-center gap-3 bg-[#333333] px-3.5">
        <button
          type="button"
          aria-label="Attach file"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-[#D0D0D0] transition hover:text-white"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <input
          type="text"
          aria-label="Type a message"
          placeholder="Type a message..."
          className="min-w-0 flex-1 bg-transparent text-xs font-light text-white outline-none placeholder:text-[#CFCFCF] sm:text-sm"
        />

        <button
          type="button"
          aria-label="Choose emoji"
          className="hidden h-8 w-8 shrink-0 items-center justify-center text-[#D0D0D0] transition hover:text-white sm:flex"
        >
          <Smile className="h-4 w-4" />
        </button>
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C88719] text-white transition hover:bg-[#B47714]"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </form>
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
