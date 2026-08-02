import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Site Preparation",
    description:
      "Professional excavation and land preparation services.",
    image: "/e1.jpg",
  },
  {
    id: 2,
    title: "Residential Construction",
    description:
      "Building quality homes with expert craftsmanship, durable materials, and attention to every detail.",
    image: "/e2.png",
  },
  {
    id: 3,
    title: "Commercial Projects",
    description:
      "Reliable commercial construction solutions.",
    image: "/e3.jpg",
  },
  {
    id: 4,
    title: "Steel Fabrication",
    description:
      "Custom steel fabrication for every project.",
    image: "/e4.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-white md:text-5xl">
            What We{" "}
            <span className="font-heading font-medium italic">
              Build
            </span>
          </h2>

          <p className="mt-5 text-[#E6E6E6] text-xl">
            Delivering reliable residential, commercial,
            site preparation, and fabrication services
            with quality craftsmanship and trusted expertise.
          </p>
        </div>

        {/* Grid */}

        <div className="grid gap-5 md:grid-cols-2 xl:flex xl:items-stretch">

          {/* Card 1 */}

          <ServiceCard service={services[0]} />

          <ServiceCard service={services[1]} />

          {/* Card 3 */}

          <ServiceCard service={services[2]} />

          {/* Card 4 */}

          <ServiceCard service={services[3]} />
        </div>

      </div>
    </section>
  );
}

type CardProps = {
  service: (typeof services)[0];
};

function ServiceCard({ service }: CardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out xl:flex-1 xl:hover:flex-[3] xl:focus-within:flex-[3]"
    >
      <div className="relative h-[420px] md:h-[380px] xl:h-[420px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover brightness-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-100 group-focus-within:scale-110 group-focus-within:brightness-100"
        />

        <div className="absolute inset-0 bg-black/0 backdrop-blur-[6px] transition-all duration-700 ease-out group-hover:backdrop-blur-none group-focus-within:backdrop-blur-none" />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" /> */}

        <div className="absolute bottom-0 left-0 z-10 p-6 opacity-0 transition duration-500 ease-out translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:p-8">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            {service.title}
          </h3>

          <p className="mt-3 max-w-lg text-white/75">
            {service.description}
          </p>

          <Link
            href={`/services-details/${service.id}`}
            className="mt-5 inline-flex items-center gap-2 text-[#C68A28] transition hover:gap-3"
          >
            Learn More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
