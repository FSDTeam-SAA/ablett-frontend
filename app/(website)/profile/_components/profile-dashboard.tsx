"use client";

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

type ProfileDashboardProps = {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
};

export default function ProfileDashboard({
  activeSection,
  onSectionChange,
}: ProfileDashboardProps) {
  return (
    <div
      className={`flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start ${
        activeSection === "messages" ? "mt-0" : "mt-10 sm:mt-14 lg:mt-24"
      }`}
    >
      <ProfileSidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
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
