import {
  HardHat,
  BadgeCheck,
  Pickaxe,
  ShieldCheck,
  Hourglass,
  MessagesSquare,
  Star,
  Building2,
} from "lucide-react";

const features = [
  {
    title: "Experienced Professionals",
    description:
      "Our skilled construction team brings years of hands-on experience across every project.",
    icon: HardHat,
  },
  {
    title: "Quality Workmanship",
    description:
      "We deliver durable, high-quality construction using trusted materials and proven methods.",
    icon: BadgeCheck,
  },
  {
    title: "Modern Equipment & Fleet",
    description:
      "Our advanced fleet helps complete projects safely, efficiently, and on schedule.",
    icon: Pickaxe,
  },
  {
    title: "Safety Comes First",
    description:
      "We maintain strict safety standards to protect people, equipment, and every job site.",
    icon: ShieldCheck,
  },
  {
    title: "On-Time Project Completion",
    description:
      "Efficient planning and project management keep every project moving on schedule.",
    icon: Hourglass,
  },
  {
    title: "Clear Communication",
    description:
      "We provide transparent updates and keep clients informed throughout every project.",
    icon: MessagesSquare,
  },
  {
    title: "Customer Satisfaction",
    description:
      "We build lasting relationships through dependable service and exceptional results.",
    icon: Star,
  },
  {
    title: "Complete Solutions",
    description:
      "From raw land preparation to final construction, we manage every stage with precision.",
    icon: Building2,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F7F2EA] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-light text-black md:text-5xl">
            Why{" "}
            <span className="font-serif italic">
              Choose
            </span>{" "}
            Us
          </h2>

          <p className="mt-5 text-[17px] leading-8 text-neutral-600">
            Delivering dependable construction solutions with
            experienced professionals, modern equipment, and an
            unwavering commitment to quality, safety, and customer
            satisfaction.
          </p>
        </div>

        {/* Cards */}

        <div className="grid overflow-hidden rounded-xl border border-[#E8D9C2] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="border-b border-r border-[#E8D9C2] bg-[#F7F2EA] p-8 transition-all duration-300 hover:bg-[#F3EBDD]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[#F0DFC4]">
                  <Icon
                    className="h-7 w-7 text-[#C8891D]"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-black">
                  {feature.title}
                </h3>

                <p className="text-[15px] leading-7 text-neutral-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}