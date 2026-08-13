import Image from "next/image";
import {
  ArrowRight,
  Building2,
  HardHat,
  PanelsTopLeft,
  PlusSquare,
  Truck,
  Warehouse,
} from "lucide-react";

const commercialServices = [
  {
    icon: Warehouse,
    title: "New Commercial Construction",
    description:
      "From the ground up, we build shops, warehouses, offices, storage facilities, agricultural buildings, and more.",
  },
  {
    icon: Building2,
    title: "Metal Buildings & Commercial Shops",
    description:
      "Durable, versatile, and cost-effective solutions for a wide range of commercial and agricultural needs.",
  },
  {
    icon: HardHat,
    title: "Site Preparation & Excavation",
    description:
      "Land clearing, grading, excavation, building pads, drainage, and access preparation.",
  },
  {
    icon: Truck,
    title: "Concrete & Foundations",
    description:
      "Building slabs, foundations, driveways, parking lots, aprons, and equipment pads.",
  },
  {
    icon: PanelsTopLeft,
    title: "Build-Outs & Interior Construction",
    description:
      "Interior framing, offices, mezzanines, storage areas, workspaces, and facility improvements.",
  },
  {
    icon: PlusSquare,
    title: "Additions & Expansions",
    description:
      "Expand your existing building with additional space to support your growing business.",
  },
];

const projectSteps = [
  {
    image: {
      src: "/e5.jpeg",
      alt: "Commercial site development and ground preparation",
    },
    title: "Site Development",
    description:
      "Excavation, grading, and site preparation create a solid foundation for your project.",
  },
  {
    image: {
      src: "/e4.jpg",
      alt: "Interior commercial framing and construction work",
    },
    title: "Interior Construction",
    description:
      "Structural framing, mezzanines, and build-outs create functional space for your business.",
  },
  {
    image: {
      src: "/f1.png",
      alt: "Finished commercial facility exterior",
    },
    title: "Finished Facility",
    description:
      "A durable, high-quality commercial facility built for long-term performance.",
  },
];

export default function CommercialConstructionDetails() {
  return (
    <>
      <section className="bg-[#F7F4EF] py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Commercial Services
            </p>
            <h2 className="mt-2 text-[28px] font-semibold leading-tight sm:text-[38px] lg:text-[44px]">
              Complete Commercial Construction Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-black/65 sm:text-base sm:leading-7">
              From site preparation to final construction, A7 Property
              Solutions brings multiple construction capabilities together to
              deliver functional, durable, and high-quality commercial projects
              on time and on budget.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {commercialServices.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="flex min-h-[230px] flex-col rounded-md border border-black/10 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#BB7B1D]/10 text-[#BB7B1D]">
                    <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.7} />
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

      <section className="relative overflow-hidden bg-black py-12 text-white sm:py-16 lg:py-20">
        <Image
          src="/service.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-semibold uppercase leading-tight sm:text-[40px] lg:text-[44px]">
              From Groundwork to Finished Facility
            </h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[#BB7B1D] sm:text-base">
              One team. One vision. From raw land to finished projects.
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {projectSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-md bg-[#F7F4EF] text-black"
              >
                <div className="relative h-[230px] bg-black/10 sm:h-[300px] lg:h-[280px] xl:h-[340px]">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="grid grid-cols-[54px_1fr] gap-3 p-5 sm:grid-cols-[64px_1fr] sm:p-6">
                  <div className="font-heading text-[54px] italic leading-none text-[#BB7B1D] sm:text-[64px]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase leading-5">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-black/65">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < projectSteps.length - 1 ? (
                  <div className="pointer-events-none absolute right-4 top-[205px] z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-[#BB7B1D] text-white shadow-lg lg:flex xl:top-[265px]">
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
