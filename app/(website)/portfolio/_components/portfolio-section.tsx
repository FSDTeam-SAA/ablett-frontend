"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import ProjectCard from "./project-card";
import PortfolioSectionSkeleton from "./portfolio-section-skeleton";

type Project = {
  _id: string;
  title: string;
  description: string | null;
  coverImage: string;
  scope: string | null;
  challenge: string | null;
  a7Solution: string | null;
  result: string | null;
  equipmentsUsed: string | null;
  timeline: string | null;
  before: string | null;
  during: string | null;
  completed: string | null;
  constructionProcess: string | null;
  projectExperience: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ProjectsResponse = {
  statusCode?: number;
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
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

  return data?.data ?? [];
}

function PortfolioSectionContent() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["portfolio", "projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return <PortfolioSectionSkeleton />;
  }

  return (
    <section className="bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[36px] font-normal leading-tight sm:text-5xl lg:text-[54px]">
            Our Projects
          </h1>

          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-[#D8D8D8] sm:text-base">
            Explore our completed residential, commercial, site preparation,
            and welding projects that showcase our commitment to quality,
            safety, and excellence.
          </p>
        </div>

        {isError ? (
          <p className="mt-9 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-100">
            {error instanceof Error ? error.message : "Failed to fetch projects."}
          </p>
        ) : null}

        {!isError && projects.length === 0 ? (
          <p className="mt-9 rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-[#D8D8D8]">
            No projects found.
          </p>
        ) : null}

        {!isError && projects.length > 0 ? (
          <div className="mt-9 grid gap-x-4 gap-y-8 sm:mt-11 sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                image={project.coverImage}
                imageAlt={project.title}
                href={`/project-details/${project._id}`}
                imagePosition="center"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function PortfolioSection() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioSectionContent />
    </QueryClientProvider>
  );
}
