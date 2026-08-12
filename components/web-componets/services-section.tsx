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
    image: "/8676ccd9de21d9db80ce8ecb7303c715b1c548ca.png",
  },
  {
    id: 3,
    title: "Commercial Construction",
    description:
      "Reliable commercial construction solutions.",
    image: "/e4.jpg",
  },
  {
    id: 4,
    title: "Steel Fabrication",
    description:
      "Custom steel fabrication for every project.",
    image: "/e5.jpeg",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-black py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-[34px] font-normal leading-tight text-white sm:text-4xl md:text-5xl">
            What We{" "}
            <span className="font-heading font-medium italic">
              Build
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-[#E6E6E6] sm:mt-5 sm:text-lg md:text-xl">
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
      <div className="relative h-[300px] sm:h-[340px] md:h-[360px] lg:h-[380px] xl:h-[420px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover brightness-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-100 group-focus-within:scale-110 group-focus-within:brightness-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent backdrop-blur-[2px] transition-all duration-700 ease-out lg:bg-none lg:bg-black/0 lg:backdrop-blur-[6px] group-hover:backdrop-blur-none group-focus-within:backdrop-blur-none" />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" /> */}

        <div className="absolute bottom-0 left-0 z-10 translate-y-0 p-5 opacity-100 transition duration-500 ease-out lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 md:p-8">
          <h3 className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            {service.title}
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/75 sm:mt-3 sm:text-base">
            {service.description}
          </p>

          <Link
            href={`/services-details/${service.id}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#C68A28] transition hover:gap-3 sm:mt-5 sm:text-base"
          >
            Learn More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
