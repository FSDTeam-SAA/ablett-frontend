"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FiCalendar,
  FiLock,
  FiLogOut,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import { RiQuoteText } from "react-icons/ri";

import LogoutConfirmationModal from "@/components/common/logout-confirmation-modal";
import { cn } from "@/lib/utils";

export type ProfileSection =
  | "personal"
  | "quotes"
  | "appointments"
  | "messages"
  | "password";

type NavItem = {
  id: ProfileSection;
  label: string;
  icon: IconType;
};

const navItems: NavItem[] = [
  { id: "personal", label: "Personal Information", icon: FiUser },
  { id: "quotes", label: "Request Quote", icon: RiQuoteText },
  { id: "appointments", label: "Booking Appointment", icon: FiCalendar },
  { id: "messages", label: "Messages", icon: FiMessageSquare },
  { id: "password", label: "Changes Password", icon: FiLock },
];

type ProfileSidebarProps = {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
};

export default function ProfileSidebar({
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <aside className="w-full lg:sticky lg:top-32 lg:w-[280px]">
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex h-11 items-center gap-2.5 rounded-md px-3 text-left text-sm font-normal transition sm:h-[52px] sm:gap-3 sm:px-4 sm:text-base",
                isActive
                  ? "bg-[#C88719] text-white"
                  : "bg-[#333333] text-[#AFAFAF] hover:bg-[#3D3D3D] hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="min-w-0 truncate">{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="flex h-11 cursor-pointer items-center gap-2.5 rounded-md bg-[#333333] px-3 text-left text-sm font-normal text-[#F21F35] transition hover:bg-[#3D3D3D] sm:h-[52px] sm:gap-3 sm:px-4 sm:text-base"
        >
          <FiLogOut className="h-5 w-5 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>

      <LogoutConfirmationModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
      />
    </aside>
  );
}
