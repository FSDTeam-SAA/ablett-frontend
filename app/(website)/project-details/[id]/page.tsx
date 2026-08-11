"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import ProjectDetailsSkeleton from "../_components/project-details-skeleton";
import ProjectDetailsSection from "../_components/project-details-section";

type ProjectDetailsPageProps = {
  params: {
    id: string;
  };
};

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

type ProjectResponse = {
  statusCode?: number;
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  data?: Project;
};

const queryClient = new QueryClient();

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

async function fetchProject(projectId: string) {
  const response = await fetch(
    `${getApiBaseUrl()}/project/${encodeURIComponent(projectId)}`
  );
  const data: ProjectResponse | null = await response.json().catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure || !data?.data) {
    throw new Error(data?.message || data?.error || "Failed to fetch project.");
  }

  return data.data;
}

function projectDescription(project: Project) {
  return (
    project.description ||
    project.scope ||
    "Explore the scope, construction stages, and execution details behind this A7 Property Solutions project."
  );
}

function projectDetails(project: Project) {
  return [
    { label: "Scope", value: project.scope },
    { label: "Challenge", value: project.challenge },
    { label: "A7 solution", value: project.a7Solution },
    { label: "Result", value: project.result },
    { label: "Equipments Used", value: project.equipmentsUsed },
    { label: "Timeline", value: project.timeline },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value)
  );
}

function projectStages(project: Project) {
  return [
    {
      label: "Before",
      image: project.before,
      imageAlt: `${project.title} before project phase`,
    },
    {
      label: "During",
      image: project.during,
      imageAlt: `${project.title} during project phase`,
    },
    {
      label: "Completed",
      image: project.completed,
      imageAlt: `${project.title} completed project phase`,
    },
  ].filter((stage): stage is { label: string; image: string; imageAlt: string } =>
    Boolean(stage.image)
  );
}

function ProjectDetailsContent({ projectId }: { projectId: string }) {
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => fetchProject(projectId),
  });

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (isError || !project) {
    return (
      <section className="bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10">
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error instanceof Error ? error.message : "Failed to fetch project."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <ProjectDetailsSection
      title={project.title}
      description={projectDescription(project)}
      heroImage={project.coverImage || "/build.png"}
      heroImageAlt={project.title}
      details={projectDetails(project)}
      stages={projectStages(project)}
      constructionProcess={project.constructionProcess}
      projectExperience={project.projectExperience}
    />
  );
}

const Page = ({ params }: ProjectDetailsPageProps) => {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ProjectDetailsContent projectId={params.id} />
      </QueryClientProvider>
    </main>
  );
};

export default Page;
