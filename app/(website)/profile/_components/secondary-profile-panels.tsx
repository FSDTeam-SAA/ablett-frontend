"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const inputClass =
  "h-[42px] w-full rounded-md border border-[#8A8A8A] bg-[#333333] px-3 text-sm font-light text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

const queryClient = new QueryClient();

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
  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <h2 className="text-[22px] font-semibold leading-tight sm:text-[28px]">
        Massage
      </h2>
      <p className="mt-1 text-sm font-light text-[#BDBDBD]">
        Send a quick message to our project support team.
      </p>

      <form className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-normal text-white">
            Subject
          </span>
          <input
            className={inputClass}
            placeholder="Enter your message subject"
            defaultValue="Project update request"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-normal text-white">
            Message
          </span>
          <textarea
            className="min-h-[170px] w-full resize-none rounded-md border border-[#8A8A8A] bg-[#333333] px-3 py-3 text-sm font-light leading-6 text-[#CFCFCF] outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25"
            placeholder="Write your message here..."
            defaultValue="I would like to discuss the current status of my project."
          />
        </label>

        <div className="flex justify-end">
          <Button
            type="button"
            className="h-10 rounded-full bg-[#C88719] px-8 text-sm text-white hover:bg-[#B47714]"
          >
            Send Message
          </Button>
        </div>
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
