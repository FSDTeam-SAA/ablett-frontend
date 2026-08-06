import CountUpStat from "@/components/common/count-up-stat";

export default function AboutSection() {
  const stats = [
    {
      end: 16,
      suffix: "+",
      label: "Years of Construction Experience",
    },
    {
      end: 100,
      suffix: "+",
      label: "Projects Completed",
    },
    {
      end: 100,
      suffix: "%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <section id="about" className="bg-black py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* Left */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="max-w-[580px] text-[34px] font-normal leading-[1.12] text-[#FFFFFF] sm:text-[42px] md:text-5xl lg:text-[56px] lg:leading-[1.15]">
              Building Strong{" "}
              <span className="font-heading font-medium italic">
                Foundations
              </span>{" "}
              for Every Project
            </h2>
          </div>

          {/* Right */}
          <div>
            <div className="space-y-4 text-base leading-7 text-[#E6E6E6] sm:space-y-5 sm:text-lg sm:leading-8 lg:space-y-6 lg:text-xl">
              <p>
                A7 Property Solutions was built on the belief that quality
                construction is about more than completing a project it&apos;s about
                building trust, creating lasting relationships, and delivering
                results clients can rely on for years to come. Every project
                begins with understanding our clients&apos; vision, carefully
                planning each stage, and applying proven construction practices
                that ensure durability, safety, and long-term value.
              </p>

              <p>
                Over the years, we&apos;ve continued to grow by staying committed to
                the principles that matter most: honest communication,
                dependable service, skilled workmanship, and attention to every
                detail. Whether working on residential, commercial, or site
                development projects, our focus remains the same delivering
                reliable solutions that exceed expectations and leave a lasting
                impression.
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/15 sm:my-10" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
              {stats.map((item) => (
                <CountUpStat
                  key={item.label}
                  end={item.end}
                  suffix={item.suffix}
                  label={item.label}
                  valueAs="h3"
                  valueClassName="text-3xl font-semibold text-white sm:text-4xl"
                  labelClassName="mt-2 text-sm leading-5 text-white sm:text-base sm:leading-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
