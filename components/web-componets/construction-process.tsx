"use client";

import { useEffect, useRef } from "react";

const processSteps = [
  {
    number: "1.",
    title: "Construction & Execution",
    description:
      "We understand your goals, budget, timeline, and project requirements to recommend the best construction solution.",
  },
  {
    number: "2.",
    title: "Initial Consultation",
    description:
      "We evaluate the site, prepare estimates, and develop a detailed construction plan before work begins.",
  },
  {
    number: "3.",
    title: "Planning & Site Assessment",
    description:
      "Our team evaluates the project site, reviews technical requirements, prepares estimates, and develops a detailed execution plan before construction begins.",
  },
   {
    number: "4.",
    title: "Site Preparation",
    description:
      "We prepare the site through excavation, grading, clearing, foundation work, and utility preparation to ensure a solid start for construction.",
  },
  {
    number: "5.",
    title: "Final Delivery & Warranty",
    description:
      "After the final walkthrough and approval, we hand over the completed project and provide warranty support for long-term confidence.",
  },
 
  {
    number: "6.",
    title: "Quality Inspection",
    description:
      "Every project undergoes thorough inspections and quality checks to ensure all work meets industry standards and client expectations.",
  },
];

export default function ConstructionProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let isMounted = true;

    const updateProcessLine = () => {
      const section = sectionRef.current;
      const track = section?.querySelector<HTMLElement>("[data-process-track]");
      const line = section?.querySelector<HTMLElement>("[data-process-line]");
      const dots = section
        ? Array.from(section.querySelectorAll<HTMLElement>("[data-process-dot]"))
        : [];

      if (!track || !line || dots.length < 2) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const firstDotRect = dots[0].getBoundingClientRect();
      const lastDotRect = dots[dots.length - 1].getBoundingClientRect();
      const top = firstDotRect.top - trackRect.top + firstDotRect.height / 2;
      const bottom =
        lastDotRect.top - trackRect.top + lastDotRect.height / 2;

      line.style.top = `${top}px`;
      line.style.height = `${Math.max(bottom - top, 0)}px`;
    };

    updateProcessLine();
    window.addEventListener("resize", updateProcessLine);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", updateProcessLine);
      };
    }

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        updateProcessLine();

        const cards = gsap.utils.toArray<HTMLElement>("[data-process-card]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-process-dot]");

        gsap.fromTo(
          "[data-process-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-process-list]",
              start: "top 78%",
              end: "bottom 62%",
              scrub: true,
            },
          }
        );

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              clipPath: "inset(0 0 100% 0)",
              y: -22,
              scale: 0.98,
              transformOrigin: "top center",
            },
            {
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            }
          );

          if (dots[index]) {
            gsap.fromTo(
              dots[index],
              { scale: 0.35, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.45,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }, sectionRef);
    };

    setupAnimation();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", updateProcessLine);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-black py-14 sm:py-16 md:py-20 lg:py-[120px]"
    >
      <div className="mx-auto container px-5 sm:px-8 lg:px-[42px]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-12">
          <div className="text-white lg:sticky lg:top-28 lg:self-start lg:pt-2">
            <h2 className="max-w-[360px] text-[32px] font-normal leading-[1.18] sm:text-[42px] lg:text-[44px]">
              Our Construction{" "}
              <span className="block font-heading font-medium italic">
                Process
              </span>
            </h2>

            <p className="mt-4 max-w-[330px] text-sm leading-7 text-white/80 sm:mt-5 sm:text-lg">
              Our streamlined construction process keeps every project
              organized, efficient, and built to the highest standards.
            </p>
          </div>

          <div data-process-track className="relative pl-8 sm:pl-11 lg:pl-12">
            <span
              aria-hidden="true"
              data-process-line
              className="absolute left-3 top-6 h-0 w-px origin-top bg-[#C9871B] sm:left-3.5 lg:left-4"
            />

            <ol data-process-list className="space-y-3">
              {processSteps.map((step) => (
                <li key={step.number} className="relative">
                  <span
                    aria-hidden="true"
                    data-process-dot
                    className="absolute -left-[32px] top-3 h-5 w-5 rounded-full bg-[#C9871B] sm:-left-[34px] sm:h-6 sm:w-6 lg:-left-[44px]"
                  >
                    <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  </span>

                  <div
                    data-process-card
                    className="rounded-md bg-[#343434] px-4 py-4 will-change-transform sm:px-6 sm:py-5"
                  >
                    <h3 className="text-base font-semibold leading-6 text-white sm:text-lg">
                      <span>{step.number}</span> {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/65 sm:mt-3 sm:text-[16px]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
