"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "These guys were great to work with. They listened to my ideas, made excellent suggestions, and completed everything quickly and within budget. A7 can handle just about anything, and their attention to detail ensures the job is done right.",
    name: "— Joe B., Sadler, Texas",
    company: "Excavation Project",
    image: "/vater1.png",
  },
  {
    quote:
      "We've used Shawn and the A7 team on multiple remodels and rental-property turnarounds in Sadler and Honey Grove, including units left in rough condition. Shawn communicates clearly from the first walkthrough through the final punch list, so we always know where each project stands. His pricing is fair and straightforward, with no surprises.\n\nWhat sets Shawn apart is that he doesn't just complete the work requested—he offers ideas that make the finished project better, more durable, and more efficient. His recommendations have saved us money and headaches more than once. The crew is professional, respectful of the property, and easy to work with. When we need work done right, we call A7.",
    name: "— Pete A., Real Estate Investor",
    company: "North Texas",
    image: "/vater1.png",
  },
  {
    quote:
      "We hired A7 Property Solutions to update and repair several areas of our home and property. The work included installing a long horseshoe driveway and parking area with a 20-by-30-foot carport, building a 10-by-10-foot deck, replacing the back door, rebuilding the front steps, replacing bedroom carpet with laminate flooring, and painting the exterior of our house and 12-by-30-foot shed.\n\nShawn, Ethan, and the entire team were punctual, professional, and attentive to detail. Shawn communicated with us regularly and was very flexible when we added several projects after the original scope of work. When problems arose, he addressed them quickly and made sure we were satisfied with the solutions.\n\nWe would recommend A7 Property Solutions without hesitation.",
    name: "— Suzanne P.",
    company: "Home Remodel — Southern Oklahoma",
    image: "/vater1.png",
  },
  {
    quote:
      "We recently purchased a home and wanted to expand our patio and driveway, add a sidewalk, and pour a concrete slab for a future shop. Shawn met with us, listened to our ideas, and turned them into a clear design plan. He then handled the entire project, from permits through the final pour.\n\nShawn and the crew worked quickly, professionally, and kept us informed throughout the process. We were very pleased with the finished work and will use A7 Property Solutions again. We would gladly recommend them to anyone needing concrete or foundation work.",
    name: "— Matt P.",
    company: "Concrete and Foundation Project — Collinsville, Texas",
    image: "/vater1.png",
  },
];

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const scrollTestimonials = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const card = slider.querySelector<HTMLElement>(
      "[data-testimonial-card]",
    );

    const cardWidth = card?.offsetWidth ?? slider.clientWidth;

    slider.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const toggleReview = (index: number) => {
    setExpandedReviews((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  return (
    <section className="bg-black text-white">
      <div className="mx-auto container px-5 py-16 sm:px-8 md:py-20 lg:px-5 lg:py-24">
        {/* Header */}
         <div className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-start md:justify-between md:gap-8 lg:mb-16">
          <h2 className="max-w-[720px] text-[32px] font-normal leading-[1.16] text-white sm:text-[42px] md:text-5xl lg:text-[56px]">
            <span className="font-heading font-medium italic">
              Trusted by
            </span>{" "}
            Property Owners
            <br className="hidden sm:block" /> & Businesses
          </h2>

          <div className="flex gap-3 sm:gap-4 md:pt-5">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollTestimonials("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C88719] text-[#C88719] transition hover:bg-[#C88719] hover:text-black sm:h-12 sm:w-12 md:h-14 md:w-14"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollTestimonials("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C88719] text-[#C88719] transition hover:bg-[#C88719] hover:text-black sm:h-12 sm:w-12 md:h-14 md:w-14"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={sliderRef}
          className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-10 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 md:gap-12 lg:-mx-5 lg:gap-16 lg:px-5 lg:pb-14 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedReviews.includes(index);

            return (
              <article
                key={testimonial.name}
                data-testimonial-card
                className="min-w-[84vw] px-9 lg:px-5   snap-start sm:min-w-[48%] lg:min-w-[calc((100%-8rem)/3)]"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Image
                    src="/qoute.png"
                    alt="quote"
                    width={1000}
                    height={1000}
                    className="h-6 w-6 sm:h-5 sm:w-6"
                  />
                </div>

                {/* Review */}
                <div className="relative">
                  <p
                    className={`whitespace-pre-line text-base leading-7 text-white transition-all duration-500 sm:text-lg sm:leading-8 md:text-[16px] md:leading-7 ${
                      !isExpanded ? "line-clamp-5" : ""
                    }`}
                  >
                    {testimonial.quote}
                  </p>

                  {/* Expand / Collapse Button */}
                  <button
                    type="button"
                    onClick={() => toggleReview(index)}
                    aria-label={
                      isExpanded
                        ? "Show less review"
                        : "Read full review"
                    }
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#C88719] transition-all duration-300 hover:text-[#e0a32d]"
                  >
                    <span>{isExpanded ? "Show less" : "Read more"}</span>

                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                    )}
                  </button>
                </div>

                {/* User Info */}
                <div className="mt-7 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-base font-medium text-white">
                      {testimonial.name}
                    </h3>

                    <p className="mt-0.5 text-sm text-white/70">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}