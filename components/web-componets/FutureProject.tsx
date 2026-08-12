"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import FutureProjectSkeleton from "./_components/future-project-skeleton";

type Project = {
  _id: string;
  title: string;
  coverImage: string;
};

type ProjectsResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  data?: Project[];
};

const queryClient = new QueryClient();

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

async function fetchProjects() {
  const response = await fetch(`${getApiBaseUrl()}/project`);
  const data: ProjectsResponse | null = await response.json().catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(data?.message || data?.error || "Failed to fetch projects.");
  }

  return (data?.data ?? []).slice(0, 3);
}

function FutureProjectContent() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["home", "future-projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <FutureProjectSkeleton />;
  }

  return (
    <section id="portfolio" className="bg-black py-14 sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between lg:gap-8">
          <div className="text-white">
            <h2 className="text-[30px] font-normal leading-[1.15] sm:text-[38px] lg:text-[42px]">
              Built to Perform.{" "}
              <span className="font-heading font-medium italic">
                Designed
              </span>{" "}
              to Last.
            </h2>

            <p className="mt-3 max-w-[500px] text-sm leading-6 text-[#E6E6E6] sm:text-base sm:leading-[1.45]">
              Explore a selection of residential, commercial, and site
              development projects completed by our team.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-[#C9871B] px-5 text-sm font-medium text-white transition-colors hover:bg-[#d89727] sm:h-11 sm:px-6 md:mt-6"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isError ? (
          <p className="mt-7 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-100 sm:mt-8">
            {error instanceof Error ? error.message : "Failed to fetch projects."}
          </p>
        ) : null}

        {!isError && projects.length === 0 ? (
          <p className="mt-7 rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-[#D8D8D8] sm:mt-8">
            No projects found.
          </p>
        ) : null}

        {!isError && projects.length > 0 ? (
          <div className="mt-7 grid gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/project-details/${project._id}`}
                className="group block"
                aria-label={`View ${project.title}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-md bg-white/10">
                  <Image
                    src={project.coverImage || "/build.png"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                <div className="mt-2 flex min-h-6 items-center justify-between gap-3">
                  <h3 className="text-lg font-medium leading-5 text-white transition-colors group-hover:text-[#C9871B] sm:text-[20px]">
                    {project.title}
                  </h3>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C9871B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function FutureProject() {
  return (
    <QueryClientProvider client={queryClient}>
      <FutureProjectContent />
    </QueryClientProvider>
  );
}
