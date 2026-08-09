"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";

import ServiceDetailsFaqSkeleton from "./service-details-faq-skeleton";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

type FaqResponse = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: FaqItem[];
};

const faqImage = {
  src: "/faq1.png",
  alt: "Foundation rebar prepared for concrete construction",
  position: "center",
};

const queryClient = new QueryClient();
const faqLimit = 5;

async function fetchFaqs() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const url = new URL(`${apiBaseUrl.replace(/\/+$/, "")}/faq`);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", String(faqLimit));
  url.searchParams.set("sortBy", "createdAt");
  url.searchParams.set("sortOrder", "desc");

  const response = await fetch(url.toString());
  const data: FaqResponse | null = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to fetch FAQs.");
  }

  return data?.data ?? [];
}

function ServiceDetailsFaqContent() {
  const [openIndex, setOpenIndex] = useState(0);
  const { data: faqs = [], isLoading, isError, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  if (isLoading) {
    return <ServiceDetailsFaqSkeleton />;
  }

  return (
    <section className="bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto grid gap-9 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-10">
        <div className="relative mx-auto w-full max-w-[430px] pb-8 pr-3 sm:pb-10 sm:pr-0 lg:mx-0">
          <div className="absolute left-0 top-0 h-[84%] w-[74%] rounded-lg bg-[#BB7B1D]" />

          <div className="relative ml-auto mt-8 aspect-[0.84] w-[88%] overflow-hidden rounded-lg bg-white/10 sm:mt-9">
            <Image
              src={faqImage.src}
              alt={faqImage.alt}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 430px, 90vw"
              className="object-cover"
              style={{ objectPosition: faqImage.position }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-[30px] font-normal leading-tight sm:text-[42px] lg:text-[44px]">
            Frequently Asked{" "}
            <span className="font-heading font-medium italic">Questions</span>
          </h2>

          {isError ? (
            <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100 sm:mt-7">
              {error instanceof Error ? error.message : "Failed to fetch FAQs."}
            </p>
          ) : null}

          {!isError && faqs.length === 0 ? (
            <p className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-[#D7D7D7] sm:mt-7">
              No FAQs found.
            </p>
          ) : null}

          {!isError && faqs.length > 0 ? (
            <>
              <div className="mt-5 divide-y divide-white/15 sm:mt-7">
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
                        <span className="text-sm font-semibold leading-6 text-white sm:text-lg">
                          {item.question}
                        </span>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white/90">
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      {isOpen ? (
                        <p className="max-w-[650px] pb-5 text-sm font-light leading-7 text-[#D7D7D7]">
                          {item.answer}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex justify-start">
                <Link
                  href="/faq"
                  className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-full bg-[#BB7B1D] px-7 text-sm font-semibold text-white transition hover:bg-[#a96f1a]"
                >
                  See More
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailsFaq() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceDetailsFaqContent />
    </QueryClientProvider>
  );
}
