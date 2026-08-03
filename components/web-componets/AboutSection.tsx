export default function AboutSection() {
  const stats = [
    {
      value: "12+",
      label: "Years of Experience",
    },
    {
      value: "100+",
      label: "Projects Completed",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
    },
    {
      value: "2K",
      label: "Positive Reviews",
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
                At A7 Property Solutions, we specialize in delivering
                high-quality residential and commercial construction
                services from concept to completion. Whether it&apos;s
                preparing raw land, constructing durable foundations,
                fabricating custom steel structures, or completing
                full-scale building projects, our experienced team is
                committed to excellence at every stage.
              </p>

              <p>
                With modern equipment, skilled professionals, and a
                customer-first approach, we ensure every project is
                completed safely, efficiently, and to the highest
                industry standards.
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/15 sm:my-10" />

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-8">
              {stats.map((item) => (
                <div key={item.label}>
                  <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-white sm:text-base sm:leading-6">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
