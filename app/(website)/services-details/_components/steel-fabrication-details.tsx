import Image from "next/image";
import {
  CircleCheck,
  Cross,
  Dock,
  Fence,
  Hammer,
  Landmark,
  MessagesSquare,
  Ruler,
  Shield,
  ShieldCheck,
  Warehouse,
  Wrench,
} from "lucide-react";

const fabricationServices = [
  {
    icon: Fence,
    title: "Custom Pipe Fencing",
    description:
      "Durable, clean-lined pipe fencing for ranches, farms, and residential properties.",
  },
  {
    icon: Landmark,
    title: "Property Entrances & Gates",
    description:
      "Custom entrances and gates that create a strong first impression and add security.",
  },
  {
    icon: Warehouse,
    title: "Steel Bridge Crossings",
    description:
      "Engineered steel bridge solutions built to handle heavy loads and rough terrain.",
  },
  {
    icon: Dock,
    title: "Steel Pond Docks",
    description:
      "Strong, low-maintenance steel docks built for fishing, recreation, and waterfront access.",
  },
  {
    icon: Hammer,
    title: "Structural & Utility Fabrication",
    description:
      "Beams, frames, and structural steel for buildings, sheds, and utility structures.",
  },
  {
    icon: Wrench,
    title: "Repairs, Modifications & Custom Builds",
    description:
      "Repairs, upgrades, and one-off steel projects built to your exact needs.",
  },
];

const qualityPoints = [
  {
    icon: Ruler,
    title: "Custom Fabrication",
    description:
      "Tailored solutions built to your property and project needs.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Workmanship",
    description:
      "Skilled fabricators and precision workmanship you can trust.",
  },
  {
    icon: Warehouse,
    title: "Residential, Commercial & Agricultural",
    description:
      "Serving ranches, farms, businesses, and homeowners.",
  },
  {
    icon: Shield,
    title: "Durable Materials",
    description:
      "We use high-quality steel for strength, safety, and longevity.",
  },
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    description:
      "Honest pricing, clear timelines, and updates every step of the way.",
  },
  {
    icon: Cross,
    title: "Built on Faith",
    description:
      "We work with integrity and seek to honor God in all we do.",
  },
];

const featuredProjects = [
  {
    image: {
      src: "/e4.jpg",
      alt: "Steel fabrication work on a structural frame",
    },
    title: "Pipe Fencing",
    description: "Strong, clean, and built to last for years.",
  },
  {
    image: {
      src: "/e5.jpeg",
      alt: "Large steel-framed building on a prepared property",
    },
    title: "Property Entrance",
    description: "Custom entrances that make a lasting impression.",
  },
  {
    image: {
      src: "/f3.png",
      alt: "Steel and welding work inside a construction project",
    },
    title: "Steel Bridge Crossing",
    description: "Built for durability and safe passage over rough terrain.",
  },
  {
    image: {
      src: "/e7.jpeg",
      alt: "Steel and concrete construction detail",
    },
    title: "Steel Pond Docks",
    description: "Enjoy the water with a strong, low-maintenance steel dock.",
  },
];

const processSteps = [
  {
    title: "Consultation",
    description:
      "We listen to your needs, review your property, and discuss your vision.",
  },
  {
    title: "Design & Planning",
    description:
      "We define the right solution and plan every detail for success.",
  },
  {
    title: "Fabrication",
    description:
      "Skilled fabricators build your project with precision and quality materials.",
  },
  {
    title: "Installation",
    description:
      "We deliver and install with care, safety, and expert craftsmanship.",
  },
  {
    title: "Final Review",
    description:
      "We inspect the work with you to ensure everything meets expectations.",
  },
];

const projectTypes = [
  "Ranch & Farm Pipe Fencing",
  "Custom Gates & Gate Frames",
  "Property Entrances",
  "Driveway Gate Operators",
  "Steel Bridge Crossings",
  "Cattle Guard Frames",
  "Steel Pond Docks",
  "Fishing Dock Platforms",
  "Structural Steel Buildings",
  "Equipment Sheds",
  "Shops & Barndominiums Steel",
  "Patio Covers & Carports",
  "Utility & Service Racks",
  "Pipe Racks & Supports",
  "Handrails & Guardrails",
  "Staircases & Ladders",
  "Repairs & Reinforcements",
  "Custom Steel Fabrication",
  "Welding & Modifications",
  "One-Off Specialty Builds",
];

export default function SteelFabricationDetails() {
  return (
    <>
      <section className="bg-[#F7F4EF] py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Steel Services
            </p>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight sm:text-[38px] lg:text-[44px]">
              Complete Steel Fabrication Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-black/65 sm:text-base sm:leading-7">
              Custom-built steel products designed for function, safety, and
              long-term durability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {fabricationServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="flex min-h-[240px] flex-col rounded-md border border-black/10 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#BB7B1D]/10 text-[#BB7B1D]">
                    <Icon
                      aria-hidden="true"
                      className="h-8 w-8"
                      strokeWidth={1.7}
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold uppercase leading-5">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-black/65">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black py-10 text-white sm:py-12">
        <Image
          src="/service.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="container relative z-10 mx-auto grid gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10 xl:grid-cols-6">
          {qualityPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.title}
                className="rounded-md border border-white/10 bg-white/[0.04] p-5 text-center"
              >
                <Icon
                  aria-hidden="true"
                  className="mx-auto h-8 w-8 text-[#BB7B1D]"
                  strokeWidth={1.7}
                />
                <h3 className="mt-3 text-xs font-extrabold uppercase leading-5 text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#F7F4EF] py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Featured Projects
            </p>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight sm:text-[38px] lg:text-[44px]">
              Featured Steel Fabrication Projects
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-md bg-black text-white shadow-sm"
              >
                <div className="relative h-[210px] bg-white/10 sm:h-[240px] lg:h-[220px] xl:h-[260px]">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold uppercase leading-5">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Our Process
            </p>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight sm:text-[38px] lg:text-[44px]">
              Our Steel Fabrication Process
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-md border border-black/10 bg-[#F7F4EF] p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#BB7B1D] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-sm font-extrabold uppercase leading-5">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black/65">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-md bg-black p-5 text-white sm:p-7">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-[24px] font-semibold leading-tight sm:text-[32px]">
                Steel Projects We Can Help With
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                From ranch access and fencing to custom structural steel, our
                fabrication team can build practical steel solutions for your
                property.
              </p>
            </div>

            <ul className="mt-7 grid gap-3 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-4">
              {projectTypes.map((type) => (
                <li key={type} className="flex items-center gap-2.5">
                  <CircleCheck
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#BB7B1D]"
                    strokeWidth={1.8}
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
