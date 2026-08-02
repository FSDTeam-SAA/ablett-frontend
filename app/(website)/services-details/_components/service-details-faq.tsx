"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqImage = {
  src: "/faq1.png",
  alt: "Foundation rebar prepared for concrete construction",
  position: "center",
};

const faqs: FaqItem[] = [
  {
    question: "What construction services do you provide?",
    answer:
      "We offer complete residential and commercial construction services, including site preparation, foundation work, welding & fabrication, structural construction, and project management from start to finish.",
  },
  {
    question: "Do you work on both residential and commercial projects?",
    answer:
      "Yes. Our team handles residential builds, renovations, commercial construction, site preparation, foundations, and structural project support.",
  },
  {
    question: "Can I request a free project estimate?",
    answer:
      "Yes. You can request a quote, share your project details, and our team will review the scope before preparing an estimate.",
  },
  {
    question: "What is your construction process?",
    answer:
      "We begin with consultation and planning, then move through estimating, scheduling, site preparation, construction, quality checks, and final project handover.",
  },
  {
    question: "Do you provide site preparation and foundation services?",
    answer:
      "Yes. We provide grading, clearing, excavation, base preparation, and foundation services for residential and commercial construction projects.",
  },
];

export default function ServiceDetailsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-black py-14 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto grid gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-10">
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
          <h2 className="text-[34px] font-normal leading-tight sm:text-[42px] lg:text-[44px]">
            Frequently Asked{" "}
            <span className="font-heading font-medium italic">Questions</span>
          </h2>

          <div className="mt-7 divide-y divide-white/15">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold leading-6 text-white sm:text-lg">
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

                  {isOpen && (
                    <p className="max-w-[650px] pb-5 text-sm font-light leading-7 text-[#D7D7D7]">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
