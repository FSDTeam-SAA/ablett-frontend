import ProjectCard from "./project-card";

const projects = [
  {
    title: "Custom Residential Home",
    image: "/build.png",
    imageAlt: "Modern custom residential home exterior",
    imagePosition: "center",
    href: "/project-details/1",
  },
  {
    title: "Site Preparation & Foundations",
    image: "/build1.png",
    imageAlt: "Excavator preparing land on a construction site",
    imagePosition: "center",
    href: "/project-details/2",
  },
  {
    title: "Commercial Facility Development",
    image: "/build3.png",
    imageAlt: "Cranes working on a commercial construction site",
    imagePosition: "center",
    href: "/project-details/3",
  },
  {
    title: "Concrete Infrastructure",
    image: "/e2.png",
    imageAlt: "Concrete wall and graded soil at a construction site",
    imagePosition: "center 42%",
    href: "/project-details/4",
  },
  {
    title: "Foundation Construction",
    image: "/e3.jpg",
    imageAlt: "Rebar prepared for concrete foundation construction",
    imagePosition: "center",
    href: "/project-details/5",
  },
  {
    title: "Industrial Construction",
    image: "/f1.png",
    imageAlt: "Industrial metal building and gravel drive",
    imagePosition: "center",
    href: "/project-details/6",
  },
];

export default function PortfolioSection() {
  return (
    <section className="bg-black pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[42px] font-normal leading-tight sm:text-5xl lg:text-[54px]">
            Our Projects
          </h1>

          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-[#D8D8D8] sm:text-base">
            Explore our completed residential, commercial, site preparation,
            and welding projects that showcase our commitment to quality,
            safety, and excellence.
          </p>
        </div>

        <div className="mt-11 grid gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              image={project.image}
              imageAlt={project.imageAlt}
              href={project.href}
              imagePosition={project.imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
