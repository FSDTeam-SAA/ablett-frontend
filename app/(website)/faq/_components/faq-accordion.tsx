"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Loader2, Minus, Plus } from "lucide-react";

import FaqAccordionSkeleton from "./faq-accordion-skeleton";

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

const queryClient = new QueryClient();
const pageSize = 8;

async function fetchFaqs(page: number) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const url = new URL(`${apiBaseUrl.replace(/\/+$/, "")}/faq`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("sortBy", "createdAt");
  url.searchParams.set("sortOrder", "desc");

  const response = await fetch(url.toString());
  const data: FaqResponse | null = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || "Failed to fetch FAQs.");
  }

  return {
    faqs: data?.data ?? [],
    meta: data?.meta ?? {
      page,
      limit: pageSize,
      total: data?.data?.length ?? 0,
    },
  };
}

function FaqAccordionContent() {
  const [openIndex, setOpenIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleFaqs, setVisibleFaqs] = useState<FaqItem[]>([]);
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["faqs", currentPage],
    queryFn: () => fetchFaqs(currentPage),
  });
  const totalFaqs = data?.meta.total ?? visibleFaqs.length;
  const hasMore = visibleFaqs.length < totalFaqs;
  const isLoadingMore = isFetching && currentPage > 1;

  useEffect(() => {
    if (!data) return;

    setVisibleFaqs((current) => {
      if (currentPage === 1) {
        return data.faqs;
      }

      const existingIds = new Set(current.map((item) => item._id));
      const nextFaqs = data.faqs.filter((item) => !existingIds.has(item._id));
      return [...current, ...nextFaqs];
    });
  }, [currentPage, data]);

  if (isLoading) {
    return <FaqAccordionSkeleton />;
  }

  const handleShowMore = () => {
    if (isLoadingMore || !hasMore) return;
    setCurrentPage((page) => page + 1);
  };

  const handleSeeLess = () => {
    setVisibleFaqs((current) => current.slice(0, pageSize));
    setCurrentPage(1);
    setOpenIndex(0);
  };

  return (
    <section id="faq" className="bg-black py-8 text-white sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8 xl:px-0">
        {isError ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error instanceof Error ? error.message : "Failed to fetch FAQs."}
          </p>
        ) : null}

        {!isError && visibleFaqs.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-[#D7D7D7]">
            No FAQs found.
          </p>
        ) : null}

        {!isError && visibleFaqs.length > 0 ? (
          <>
            <div className="divide-y divide-white/15">
              {visibleFaqs.map((item, index) => {
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

            <div className="mt-8 flex justify-center">
              {hasMore ? (
                <button
                  type="button"
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                  className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-full bg-[#BB7B1D] px-7 text-sm font-semibold text-white transition hover:bg-[#a96f1a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "More"
                  )}
                </button>
              ) : visibleFaqs.length > pageSize ? (
                <button
                  type="button"
                  onClick={handleSeeLess}
                  className="inline-flex h-11 min-w-[132px] items-center justify-center rounded-full border border-[#BB7B1D] px-7 text-sm font-semibold text-[#BB7B1D] transition hover:bg-[#BB7B1D] hover:text-white"
                >
                  See Less
                </button>
              ) : null}
            </div>
          </>
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
