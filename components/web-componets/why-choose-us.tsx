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
import Image from "next/image";

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

const topRowBorderImage =
  "linear-gradient(180deg, rgba(234, 214, 185, 0) 0%, #EAD6B9 100%) 1";

const bottomRowBorderImage =
  "linear-gradient(180deg, #EAD6B9 0%, rgba(234, 214, 185, 0) 100%) 1";

const middleRowBorderImages = [
  "linear-gradient(90deg, rgba(234, 214, 185, 0) 0%, #EAD6B9 100%)",
  "linear-gradient(90deg, #EAD6B9 0%, #EAD6B9 100%)",
  "linear-gradient(90deg, #EAD6B9 0%, #EAD6B9 100%)",
  "linear-gradient(90deg, #EAD6B9 0%, rgba(234, 214, 185, 0) 100%)",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8F2E8] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-4xl text-center">
          <h2 className="text-4xl font-normal text-black md:text-5xl">
            Why <span className="font-heading font-medium italic">Choose</span>{" "}
            Us
          </h2>

          <p className="mt-5 text-xl leading-8 text-[#333333]">
            Delivering dependable construction solutions with experienced
            professionals, modern equipment, and an unwavering commitment to
            quality, safety, and customer satisfaction.
          </p>
        </div>

        {/* Cards */}

        <div className="grid overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isTopRow = index < 4;
            const isBottomRow = index >= 4;
            const isFirstColumn = index % 4 === 0;

            return (
              <div
                key={index}
                className="
                 relative bg-[#F7F2EA] p-8 "
                style={{
                  borderStyle: "solid",
                  borderWidth: isFirstColumn ? "0" : "0 0 0 1px",
                  borderImage: isBottomRow
                    ? bottomRowBorderImage
                    : topRowBorderImage,
                }}
              >
                {isTopRow && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 hidden h-px w-full lg:block"
                    style={{
                      background: middleRowBorderImages[index],
                    }}
                  />
                )}

                {isTopRow && index < 3 && (
                  <Image
                    src="/star.png"
                    width={100}
                    height={100}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-7 w-7 translate-x-1/2 translate-y-1/2 lg:block"
                  />
                )}

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[#EAD6B9]">
                  <Icon className="h-7 w-7 text-[#C8891D]" strokeWidth={1.8} />
                </div>

                <h3 className="mb-3 text-xl font-medium text-[#000000]">
                  {feature.title}
                </h3>

                <p className="text-[16px] leading-7 text-[#595959]">
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
