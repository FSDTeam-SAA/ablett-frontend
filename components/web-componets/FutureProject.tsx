import ProjectCard from "../common/project-card";

const projects = [
  {
    title: "Custom Residential Home",
    image: "/images/project-1.jpg",
  },
  {
    title: "Commercial Facility Development",
    image: "/images/project-2.jpg",
  },
  {
    title: "Site Preparation & Foundations",
    image: "/images/project-3.jpg",
  },
];

export default function FutureProject() {
  return (
    <section id="portfolio" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-[#C88719]">
              Portfolio
            </p>

            <h2 className="text-4xl font-light text-white md:text-5xl">
              Featured{" "}
              <span className="font-serif italic">
                Projects
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-white/60">
            Explore a few examples of our residential, commercial,
            site preparation, and construction work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
