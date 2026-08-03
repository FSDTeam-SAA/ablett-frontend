export default function AboutFoundationsSection() {
  return (
    <section className="bg-black py-14 text-white sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-20">
          <div>
            <h2 className="max-w-[490px] text-[32px] font-normal leading-[1.18] sm:text-[42px] lg:text-[44px]">
              Building Strong{" "}
              <span className="font-heading font-medium italic">
                Foundations
              </span>{" "}
              for Every Project
            </h2>

            <div className="my-7 h-px w-full max-w-[390px] bg-white/20 sm:my-9" />

            <div>
              <p className="text-[38px] font-medium leading-none sm:text-5xl">
                100%
              </p>
              <p className="mt-2 text-base text-white/90 sm:text-xl">
                Client Satisfaction
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-7 text-[#E6E6E6] sm:text-lg sm:leading-8 lg:pt-1">
            <p>
              A7 Property Solutions was built on the belief that quality
              construction is about more than completing a project it&apos;s
              about building trust, creating lasting relationships, and
              delivering results clients can rely on for years to come. Every
              project begins with understanding our clients&apos; vision,
              carefully planning each stage, and applying proven construction
              practices that ensure durability, safety, and long-term value.
            </p>

            <p>
              Over the years, we&apos;ve continued to grow by staying committed
              to the principles that matter most: honest communication,
              dependable service, skilled workmanship, and attention to every
              detail. Whether working on residential, commercial, or site
              development projects, our focus remains the same delivering
              reliable solutions that exceed expectations and leave a lasting
              impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
