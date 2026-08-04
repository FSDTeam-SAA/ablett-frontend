"use client";

import { useId, useState } from "react";
import { signOut } from "next-auth/react";

type LogoutConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callbackUrl?: string;
};

export default function LogoutConfirmationModal({
  open,
  onOpenChange,
  callbackUrl = "/",
}: LogoutConfirmationModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!open) return null;

  const handleLogout = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-[#151515] p-5 text-white shadow-2xl"
      >
        <h2 id={titleId} className="text-lg font-semibold">
          Logout?
        </h2>
        <p id={descriptionId} className="mt-2 text-sm leading-6 text-white/70">
          Are you sure you want to sign out from your account?
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSigningOut}
            className="h-10 cursor-pointer rounded-full border border-white/15 px-5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
            className="h-10 cursor-pointer rounded-full bg-[#BB7B1D] px-5 text-sm font-semibold text-white transition hover:bg-[#BB7B1D]/80 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
