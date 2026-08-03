"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "A7 Property Solutions exceeded our expectations from start to finish. Their team was professional, communicated clearly, and delivered excellent workmanship on schedule.",
    name: "Floyd Miles",
    company: "Vision Homes",
    image: "/Profile.png",
  },
  {
    quote:
      "From planning to project completion, A7 delivered exceptional quality and professionalism. Their skilled crew, attention to detail, and reliable service truly impressed us.",
    name: "Esther Howard",
    company: "Vision Homes",
    image: "/Profile.png",
  },
  {
    quote:
      "We trusted A7 with our commercial project, and they delivered beyond expectations. The work was completed safely, on schedule, and with excellent craftsmanship throughout.",
    name: "Albert Flores",
    company: "Vision Homes",
    image: "/Profile.png",
  },
  {
    quote:
      "Their process was organized and transparent from the first conversation. The final build matched the plan, the budget, and the quality we expected.",
    name: "Courtney Henry",
    company: "Ranchview Group",
    image: "/Profile.png",
  },
];

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const card = slider.querySelector<HTMLElement>("[data-testimonial-card]");
    const cardWidth = card?.offsetWidth ?? slider.clientWidth;

    slider.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-black py-14 sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
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

        <div
          ref={sliderRef}
          className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-10 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 md:gap-12 lg:-mx-5 lg:gap-16 lg:px-5 lg:pb-14 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              data-testimonial-card
              className="min-w-[84vw] snap-start sm:min-w-[48%] lg:min-w-[calc((100%-8rem)/3)]"
            >
            <div className="mb-6">
              <Image
                src="/qoute.png"
                alt="quote"
                width={1000}
                height={1000}
                className="h-6 w-6 sm:h-5 sm:w-6"
              />
            </div>

              <p className="-mt-2 text-base leading-7 text-white sm:text-xl sm:leading-8 md:text-[22px] md:leading-9">
                {testimonial.quote}
              </p>

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
          ))}
        </div>

      
      </div>
    </section>
  );
}
