import type { Metadata } from "next";

import AppointmentContactSection from "./_components/appointment-contact-section";

export const metadata: Metadata = {
  title: "Schedule Consultation | A7 Property Solutions",
  description:
    "Schedule a construction consultation with the A7 Property Solutions team.",
};

export default function AppointmentPage() {
  return (
    <main>
      <AppointmentContactSection />
    </main>
  );
}
