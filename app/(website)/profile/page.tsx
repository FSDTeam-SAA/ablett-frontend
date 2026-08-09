
"use client";

import { useCallback, useState } from "react";
import ProfileDashboard from "./_components/profile-dashboard";
import type { ProfileSection } from "./_components/profile-sidebar";

const profileSectionStorageKey = "ablett-profile-active-section";
const profileSections: ProfileSection[] = [
  "personal",
  "quotes",
  "appointments",
  "messages",
  "password",
];

function isProfileSection(value: string | null): value is ProfileSection {
  return profileSections.includes(value as ProfileSection);
}

function getInitialProfileSection(): ProfileSection {
  if (typeof window === "undefined") return "personal";

  const querySection = new URLSearchParams(window.location.search).get("section");
  if (isProfileSection(querySection)) return querySection;

  const savedSection = window.localStorage.getItem(profileSectionStorageKey);
  if (isProfileSection(savedSection)) return savedSection;

  return "personal";
}

function saveProfileSection(section: ProfileSection) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(profileSectionStorageKey, section);

  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  window.history.replaceState(null, "", `${url.pathname}${url.search}`);
}

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>(getInitialProfileSection);
  const isMessagesActive = activeSection === "messages";
  const handleSectionChange = useCallback((section: ProfileSection) => {
    setActiveSection(section);
    saveProfileSection(section);
  }, []);

  return (
    <main className="min-h-screen bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <section className="container mx-auto px-5 sm:px-8 lg:px-10">
        {!isMessagesActive ? (
          <div className="mx-auto max-w-[760px] text-center">
            <h1 className="text-[36px] font-normal leading-tight sm:text-5xl md:text-6xl lg:text-[68px]">
              My Profile
            </h1>
            <p className="mx-auto mt-3 max-w-[660px] text-sm font-light leading-7 text-[#E6E6E6] sm:mt-4 sm:text-base md:text-lg">
              Manage your personal information, view your appointments, track
              quote requests, and stay connected with our team from one place.
            </p>
          </div>
        ) : null}

        <ProfileDashboard
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </section>
    </main>
  );
}
