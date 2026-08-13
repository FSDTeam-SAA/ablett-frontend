import Image from "next/image";
import {
  CheckCircle2,
  CircleCheck,
  Construction,
  Droplets,
  Route,
  Tractor,
  TreePine,
} from "lucide-react";

const prepServices = [
  {
    icon: TreePine,
    title: "Land Clearing & Brush Removal",
    description:
      "Open up your property by removing brush, dirt, and obstacles to improve access and prepare for construction.",
  },
  {
    icon: Tractor,
    title: "Site Grading & Leveling",
    description:
      "Shape and level the ground for proper elevation, drainage, and project readiness.",
  },
  {
    icon: Construction,
    title: "Pad Preparation",
    description:
      "Prepare stable, compacted building pads for homes, shops, barns, and commercial structures.",
  },
  {
    icon: Route,
    title: "Driveway & Access Prep",
    description:
      "Build or improve entrances, drive lanes, and gravel base areas for reliable site access.",
  },
  {
    icon: Droplets,
    title: "Drainage & Water Flow",
    description:
      "Help control runoff and standing water with grading solutions that support long-term performance.",
  },
  {
    icon: CircleCheck,
    title: "Final Site Prep",
    description:
      "Leave the site clean, smooth, and ready for concrete, building, fencing, or the next phase of work.",
  },
];

const trustPoints = [
  "Residential, Commercial & Agricultural",
  "Experienced Project Management",
  "Quality Workmanship",
  "Clear Communication",
  "Reliable Scheduling",
  "Built on Faith. Committed to Excellence.",
];

const transformationImages = {
  beforeAfter: {
    src: "/newservice.png",
    alt: "Before and after view of a property transformation",
  },
  gallery: [
    {
      src: "/excavation4 (1).jpg",
      alt: "Freshly prepared land with grading marks",
    },
    {
      src: "/service1.jpeg",
      alt: "Wide graded site ready for the next construction phase",
    },
  ],
};

export default function SitePrepDetails() {
  return (
    <>
      <section className="bg-[#F7F4EF] py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Our Services
            </p>
            <h2 className="mt-2 text-[30px] font-semibold leading-tight sm:text-[40px] lg:text-[44px]">
              Comprehensive Site Preparation Solutions
            </h2>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-md border border-black/10 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-3">
            {prepServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="min-h-[178px] border-b border-black/10 p-6 sm:border-r lg:min-h-[196px] [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(3n)]:lg:border-r-0 [&:nth-last-child(-n+2)]:sm:border-b-0 [&:nth-last-child(-n+3)]:lg:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 h-9 w-9 shrink-0 text-[#BB7B1D]"
                      strokeWidth={1.7}
                    />
                    <div>
                      <h3 className="text-base font-bold leading-5">
                        {index + 1}. {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-black/65">
                        {service.description}
                      </p>
                    </div>
                  </div>
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
          className="object-cover opacity-20"
        />
        <div className="container relative z-10 mx-auto grid gap-8 px-5 sm:px-8 lg:grid-cols-[340px_1fr] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
              Why Choose A7
            </p>
            <h2 className="mt-3 text-[30px] font-semibold leading-tight sm:text-[36px]">
              Built on Integrity.
              <span className="block">Focused on Results.</span>
            </h2>
          </div>

          <ul className="grid gap-4 text-sm text-white/85 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[#BB7B1D]"
                  strokeWidth={1.8}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#F7F4EF] py-12 text-black sm:py-16 lg:py-20">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[360px_1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BB7B1D]">
                Before & After
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-[30px]">
                Project Transformation
              </h2>
              <p className="mt-4 text-sm leading-6 text-black/70 sm:text-base">
                See how proper excavation and site prep can completely
                transform a property.
              </p>
            </div>

            <div className="relative h-[200px] overflow-hidden rounded-md bg-black/10 sm:h-[320px] md:h-[380px] lg:h-[560px]">
              <Image
                src={transformationImages.beforeAfter.src}
                alt={transformationImages.beforeAfter.alt}
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover "
              />
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {transformationImages.gallery.map((image) => (
              <div
                key={image.src}
                className="relative min-h-[200px] overflow-hidden rounded-md bg-black/10 sm:min-h-[300px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
