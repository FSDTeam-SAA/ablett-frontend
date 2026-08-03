import type { Metadata } from "next";

import RequestQuoteContactSection from "./_components/request-quote-contact-section";

export const metadata: Metadata = {
  title: "Request a Quote | A7 Property Solutions",
  description:
    "Tell A7 Property Solutions about your project and request a construction quote.",
};

export default function RequestQuotePage() {
  return (
    <main>
      <RequestQuoteContactSection />
    </main>
  );
}
