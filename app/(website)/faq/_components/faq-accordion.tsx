"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
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
  {
    question: "What foundation types do you install?",
    answer:
      "We install common foundation systems based on project requirements, soil conditions, engineering plans, and local building standards.",
  },
  {
    question: "What types of commercial projects do you handle?",
    answer:
      "We support commercial builds, structural work, site preparation, welding, fabrication, and project management for small to large-scale construction needs.",
  },
  {
    question: "What welding services do you offer?",
    answer:
      "Our welding services include structural steel support, fabrication, repairs, custom metalwork, and construction-related welding needs.",
  },
  {
    question: "How long does a construction project take?",
    answer:
      "Timelines depend on project size, scope, permits, weather, and material availability. After reviewing your project, we can provide a clearer schedule.",
  },
  {
    question: "Can you manage large-scale projects?",
    answer:
      "Yes. We can coordinate planning, crews, equipment, scheduling, and construction management for larger residential and commercial projects.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-black py-10 text-white sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="divide-y divide-white/15">
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
                  <span className="text-base font-semibold leading-6 text-white sm:text-2xl">
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

                {isOpen && (
                  <p className="max-w-3xl pb-5 text-sm font-light leading-7 text-[#D7D7D7] sm:text-xl">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
