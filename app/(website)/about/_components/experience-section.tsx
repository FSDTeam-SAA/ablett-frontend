import Image from "next/image";
import { CircleCheck } from "lucide-react";

const services = [
  "Residential Construction",
  "Commercial Construction",
  "Site Preparation & Excavation",
  "Foundations & Concrete Work",
  "Welding & Fabrication",
  "Project Planning & Execution",
];

export default function ExperienceSection() {
  return (
    <section className="bg-black py-14 text-white sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-5">
            <div className="relative h-[360px] w-full overflow-hidden rounded-lg bg-white/10 sm:h-[480px] lg:h-[497px] lg:w-[538px]">
              <Image
                src="/about2.png"
                alt="Heavy equipment working on a construction site"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="max-full">
              <h2 className="text-[34px] font-normal leading-tight sm:text-[42px] lg:text-[44px]">
                Experience That Builds{" "}
                <span className="block font-heading font-medium italic">
                  Confidence
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#E6E6E6] sm:mt-6 sm:text-lg sm:leading-8">
                Construction requires more than the right equipment it requires
                knowledge, planning, and hands on experience. Our team brings
                practical expertise across a wide range of construction
                services, helping clients complete projects efficiently while
                maintaining the highest standards of quality and safety.
              </p>

              <ul className="mt-3 space-y-2 text-sm text-[#E6E6E6] sm:text-lg">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-2.5">
                    <CircleCheck className="h-4 w-4 shrink-0 text-white/80" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-sm leading-7 text-[#E6E6E6] sm:text-lg sm:leading-8">
                Every project is completed with careful attention to detail,
                reliable workmanship, and a commitment to delivering results
                that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
