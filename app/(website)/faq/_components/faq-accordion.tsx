"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";

import FaqAccordionSkeleton from "./faq-accordion-skeleton";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

type FaqResponse = {
  success?: boolean;
  message?: string;
  data?: FaqItem[];
};

const queryClient = new QueryClient();

async function fetchFaqs() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${apiBaseUrl.replace(/\/+$/, "")}/faq`);
  const data: FaqResponse | null = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to fetch FAQs.");
  }

  return data?.data ?? [];
}

function FaqAccordionContent() {
  const [openIndex, setOpenIndex] = useState(0);
  const { data: faqs = [], isLoading, isError, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  if (isLoading) {
    return <FaqAccordionSkeleton />;
  }

  return (
    <section id="faq" className="bg-black py-8 text-white sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8 xl:px-0">
        {isError ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error instanceof Error ? error.message : "Failed to fetch FAQs."}
          </p>
        ) : null}

        {!isError && faqs.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-[#D7D7D7]">
            No FAQs found.
          </p>
        ) : null}

        {!isError && faqs.length > 0 ? (
          <div className="divide-y divide-white/15">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item._id}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left sm:gap-5 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold leading-6 text-white sm:text-xl md:text-2xl">
                      {item.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white/85">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {isOpen ? (
                    <p className="max-w-3xl pb-4 text-sm font-light leading-7 text-[#D7D7D7] sm:pb-5 sm:text-base md:text-xl">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function FaqAccordion() {
  return (
    <QueryClientProvider client={queryClient}>
      <FaqAccordionContent />
    </QueryClientProvider>
  );
}
