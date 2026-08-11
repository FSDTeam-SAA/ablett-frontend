import Image from "next/image";

type ProjectInfoItem = {
  label: string;
  value: string;
};

type ProjectStage = {
  label: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

type ProjectDetailsSectionProps = {
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  heroImagePosition?: string;
  details: ProjectInfoItem[];
  stages: ProjectStage[];
  constructionProcess?: string | null;
  projectExperience?: string | null;
};

// const projectConstructionSteps = [
//   {
//     title: "01. Consultation",
//     description:
//       "Every successful project begins with understanding the client's vision. During the consultation phase, we discussed project goals, lifestyle requirements, budget expectations, and the overall design concept to ensure every detail aligned with the client's needs.",
//   },
//   {
//     title: "02. Planning & Design",
//     description:
//       "Our team prepared detailed construction plans, project schedules, material selections, and engineering requirements. This planning stage ensured efficient project execution while minimizing delays and maintaining construction quality.",
//   },
//   {
//     title: "03. Site Preparation & Foundation",
//     description:
//       "The construction site was cleared, graded, and prepared before excavation began. We then completed the reinforced concrete foundation, creating a strong and stable base capable of supporting the entire structure for decades.",
//   },
//   {
//     title: "04. Structural Construction",
//     description:
//       "After the foundation was completed, our team constructed the structural framework, installed roofing systems, exterior walls, windows, and weather-resistant materials. This phase transformed the project from its foundation into a fully enclosed building.",
//   },
//   {
//     title: "05. Interior Finishing",
//     description:
//       "Once the structure was complete, we focused on interior craftsmanship including drywall installation, flooring, cabinetry, painting, lighting fixtures, plumbing fixtures, and premium finish materials to create a comfortable and elegant living environment.",
//   },
//   {
//     title: "06. Final Inspection & Handover",
//     description:
//       "Before project completion, every area of the home underwent comprehensive quality inspections to ensure safety, functionality, and compliance with construction standards. After final approval, the completed home was officially handed over to the client.",
//   },
// ];

export default function ProjectDetailsSection({
  title,
  description,
  heroImage,
  heroImageAlt,
  heroImagePosition = "center",
  details,
  stages,
  // constructionProcess,
  projectExperience,
}: ProjectDetailsSectionProps) {
  return (
    <section className="bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto">
          <div>
            <h1 className="max-w-5xl text-[28px] font-semibold leading-tight sm:text-[32px]">
              {title}
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#D8D8D8] sm:text-base sm:leading-8 lg:text-[20px]">
              {description}
            </p>
          </div>

          <div className="relative mt-7 aspect-[16/10] min-h-[220px] overflow-hidden rounded-md bg-white/10 sm:mt-10 sm:aspect-[16/7.4] sm:min-h-[320px] lg:min-h-[510px]">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 1180px, 100vw"
              className="object-cover"
              style={{ objectPosition: heroImagePosition }}
            />
          </div>

          {details.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-1 sm:gap-6 lg:grid-cols-1">
              {details.map((item) => (
                <div key={item.label} className="w-full">
                  <h2 className="text-[24px] font-semibold leading-tight sm:text-[28px] lg:text-[32px]">
                    {item.label}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[#D8D8D8] sm:text-base sm:leading-8 lg:text-[20px]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {stages.length > 0 ? (
            <div className="mt-9 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-5">
              {stages.map((stage) => (
                <div key={stage.label}>
                  <div className="relative aspect-[16/12] overflow-hidden rounded-md bg-white/10">
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: stage.imagePosition ?? "center" }}
                    />
                  </div>
                  <h3 className="mt-3 text-[22px] font-semibold leading-tight sm:text-[26px] lg:text-[32px]">
                    {stage.label}
                  </h3>
                </div>
              ))}
            </div>
          ) : null}

          {/* <div className="mt-8 sm:mt-9">
            <h2 className="text-[26px] font-semibold leading-tight sm:text-[30px] lg:text-[32px]">
              Construction Process
            </h2>

            {constructionProcess ? (
              <p className="mt-3 text-sm leading-7 text-[#D8D8D8] sm:mt-4 sm:text-base sm:leading-8 lg:text-[20px]">
                {constructionProcess}
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {projectConstructionSteps.map((step) => (
                  <div key={step.title}>
                    <h3 className="text-[22px] font-semibold leading-tight sm:text-[26px] lg:text-[32px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#D8D8D8] sm:text-base sm:leading-8 lg:mt-1 lg:text-[20px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {projectExperience ? (
            <div className="mt-8 sm:mt-9">
              <h2 className="text-[26px] font-semibold leading-tight sm:text-[30px] lg:text-[32px]">
                Project Experience
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#D8D8D8] sm:mt-4 sm:text-base sm:leading-8 lg:text-[20px]">
                {projectExperience}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
