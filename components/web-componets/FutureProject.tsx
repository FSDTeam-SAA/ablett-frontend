import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Custom Residential Home",
    image: "/f1.png",
    imagePosition: "center",
  },
  {
    title: "Commercial Facility Development",
    image: "/f2.png",
    imagePosition: "center",
  },
  {
    title: "Site Preparation & Foundations",
    image: "/f3.png",
    imagePosition: "center",
  },
];

export default function FutureProject() {
  return (
    <section id="portfolio" className="bg-black py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto container px-5 sm:px-8 lg:px-5">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className=" text-white">
            <h2 className="text-[32px] font-normal leading-[1.15] sm:text-[38px] lg:text-[42px]">
              Built to Perform.{" "}
              <span className="font-heading font-medium italic">
                Designed
              </span>{" "}
              to Last.
            </h2>

            <p className="mt-3 max-w-[500px] text-[15px] leading-[1.45] text-[#E6E6E6] sm:text-base">
              Explore a selection of residential, commercial, and site
              development projects completed by our team.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-[#C9871B] px-6 text-sm font-medium text-white transition-colors hover:bg-[#d89727] md:mt-6"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
          {projects.map((project) => (
            <Link
              key={project.title}
              href="/portfolio"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-md bg-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: project.imagePosition }}
                />
              </div>

              <div className="mt-2 flex min-h-6 items-center justify-between gap-3">
                <h3 className="text-[20px] font-medium leading-5 text-white transition-colors group-hover:text-[#C9871B]">
                  {project.title}
                </h3>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C9871B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
