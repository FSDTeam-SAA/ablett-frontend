"use client";

import { useState } from "react";

import PersonalInformationPanel from "./personal-information-panel";
import {
  BookingAppointmentsPanel,
  QuoteRequestsPanel,
} from "./profile-table-panels";
import ProfileSidebar, { type ProfileSection } from "./profile-sidebar";
import {
  ChangePasswordPanel,
  MessagesPanel,
} from "./secondary-profile-panels";

export default function ProfileDashboard() {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>("personal");

  return (
    <div className="mt-10 flex flex-col gap-5 sm:mt-14 sm:gap-6 lg:mt-24 lg:flex-row lg:items-start">
      <ProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="min-w-0 flex-1">
        {activeSection === "personal" ? <PersonalInformationPanel /> : null}
        {activeSection === "quotes" ? <QuoteRequestsPanel /> : null}
        {activeSection === "appointments" ? <BookingAppointmentsPanel /> : null}
        {activeSection === "messages" ? <MessagesPanel /> : null}
        {activeSection === "password" ? <ChangePasswordPanel /> : null}
      </div>
    </div>
  );
}
