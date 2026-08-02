import ProjectDetailsSection from "../_components/project-details-section";

type ProjectDetailsPageProps = {
  params: {
    id: string;
  };
};

const projectDetails = {
  "1": {
    title: "Rural Homesite Development - Grayson County",
    description:
      "Built with precision, quality craftsmanship, and attention to every detail, this custom residential home was designed to provide a comfortable, modern, and long-lasting living space for the homeowner.",
    heroImage: "/build.png",
    heroImageAlt: "Modern custom residential home with pool",
    heroImagePosition: "center",
    details: [
      {
        label: "Scope",
        value:
          "Clearing, grading, house pad, drainage, driveway, and utility trenching.",
      },
      {
        label: "Challenge",
        value: "Poor drainage and expansive soil.",
      },
      {
        label: "A7 solution",
        value:
          "Regraded the site, established drainage flow, compacted the building pad, and coordinated foundation preparation.",
      },
      {
        label: "Result",
        value: "A build-ready homesite completed through one accountable contractor.",
      },
      {
        label: "Equipments Used",
        value: "Welding Machines, Bull-dozers and Tractors",
      },
      {
        label: "Timeline",
        value: "18 Months",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/build.png",
        imageAlt: "Custom home before project phase",
      },
      {
        label: "During",
        image: "/build.png",
        imageAlt: "Custom home during project phase",
      },
      {
        label: "Completed",
        image: "/build.png",
        imageAlt: "Custom home completed project phase",
      },
    ],
  },
  "2": {
    title: "Site Preparation & Foundations",
    description:
      "A complete land preparation and foundation project focused on stable grading, clean access, and dependable construction readiness.",
    heroImage: "/build1.png",
    heroImageAlt: "Excavator preparing a construction site",
    heroImagePosition: "center",
    details: [
      {
        label: "Scope",
        value:
          "Site clearing, excavation, rough grading, pad preparation, and foundation support.",
      },
      {
        label: "Challenge",
        value: "Uneven terrain and soil movement.",
      },
      {
        label: "A7 solution",
        value:
          "Prepared the site with heavy equipment, improved grades, and compacted the pad for reliable construction.",
      },
      {
        label: "Result",
        value: "A stable, organized site ready for the next construction phase.",
      },
      {
        label: "Equipments Used",
        value: "Excavators, Tractors and Bull-dozers",
      },
      {
        label: "Timeline",
        value: "8 Weeks",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/e1.jpg",
        imageAlt: "Heavy equipment before site preparation",
      },
      {
        label: "During",
        image: "/build1.png",
        imageAlt: "Excavator during site preparation",
      },
      {
        label: "Completed",
        image: "/e3.jpg",
        imageAlt: "Prepared foundation area after site work",
      },
    ],
  },
  "3": {
    title: "Commercial Facility Development",
    description:
      "A commercial construction project coordinated for strong structure, efficient execution, and durable long-term performance.",
    heroImage: "/build3.png",
    heroImageAlt: "Commercial construction cranes and building structure",
    heroImagePosition: "center",
    details: [
      {
        label: "Scope",
        value:
          "Commercial site coordination, structural construction, access planning, and project management.",
      },
      {
        label: "Challenge",
        value: "Complex scheduling and active-site coordination.",
      },
      {
        label: "A7 solution",
        value:
          "Managed equipment, crew workflow, material coordination, and construction milestones.",
      },
      {
        label: "Result",
        value: "A commercial build delivered with dependable field execution.",
      },
      {
        label: "Equipments Used",
        value: "Cranes, Tractors and Foundation Equipment",
      },
      {
        label: "Timeline",
        value: "14 Months",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/service.png",
        imageAlt: "Commercial site before construction phase",
      },
      {
        label: "During",
        image: "/build3.png",
        imageAlt: "Commercial construction during project phase",
      },
      {
        label: "Completed",
        image: "/f1.png",
        imageAlt: "Commercial facility completed project phase",
      },
    ],
  },
  "4": {
    title: "Concrete Infrastructure",
    description:
      "A concrete-focused project built around site stability, clean drainage, and durable infrastructure preparation.",
    heroImage: "/e2.png",
    heroImageAlt: "Concrete wall and graded construction site",
    heroImagePosition: "center 42%",
    details: [
      {
        label: "Scope",
        value:
          "Concrete wall coordination, grading, drainage support, and access preparation.",
      },
      {
        label: "Challenge",
        value: "Managing water flow near structural concrete.",
      },
      {
        label: "A7 solution",
        value:
          "Established improved grade, cleared access, and prepared the surrounding area for stable site use.",
      },
      {
        label: "Result",
        value: "A cleaner, stronger site condition around the concrete structure.",
      },
      {
        label: "Equipments Used",
        value: "Tractors, Bull-dozers and Compaction Equipment",
      },
      {
        label: "Timeline",
        value: "10 Weeks",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/e2.png",
        imageAlt: "Concrete site before work phase",
      },
      {
        label: "During",
        image: "/f2.png",
        imageAlt: "Foundation and site work during project phase",
      },
      {
        label: "Completed",
        image: "/e3.jpg",
        imageAlt: "Foundation work completed project phase",
      },
    ],
  },
  "5": {
    title: "Foundation Construction",
    description:
      "A foundation construction project prepared with careful planning, reinforced layout, and reliable field execution.",
    heroImage: "/e3.jpg",
    heroImageAlt: "Rebar layout prepared for foundation construction",
    heroImagePosition: "center",
    details: [
      {
        label: "Scope",
        value:
          "Foundation layout, reinforcement preparation, site coordination, and inspection support.",
      },
      {
        label: "Challenge",
        value: "Maintaining accuracy across reinforcement and pour preparation.",
      },
      {
        label: "A7 solution",
        value:
          "Coordinated layout, checked site conditions, and prepared the foundation area for concrete placement.",
      },
      {
        label: "Result",
        value: "A foundation-ready structure prepared with accuracy and care.",
      },
      {
        label: "Equipments Used",
        value: "Foundation Equipment, Tractors and Welding Machines",
      },
      {
        label: "Timeline",
        value: "12 Weeks",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/f2.png",
        imageAlt: "Foundation site before construction phase",
      },
      {
        label: "During",
        image: "/e3.jpg",
        imageAlt: "Foundation reinforcement during construction phase",
      },
      {
        label: "Completed",
        image: "/faq1.png",
        imageAlt: "Foundation construction completed project phase",
      },
    ],
  },
  "6": {
    title: "Industrial Construction",
    description:
      "An industrial construction project focused on functional site access, durable structure, and reliable utility-ready conditions.",
    heroImage: "/f1.png",
    heroImageAlt: "Industrial metal building and gravel access",
    heroImagePosition: "center",
    details: [
      {
        label: "Scope",
        value:
          "Industrial building support, access improvements, grading, and site preparation.",
      },
      {
        label: "Challenge",
        value: "Creating durable access and practical working conditions.",
      },
      {
        label: "A7 solution",
        value:
          "Improved site access, coordinated equipment work, and prepared the area for ongoing industrial use.",
      },
      {
        label: "Result",
        value: "A functional industrial site prepared for long-term operation.",
      },
      {
        label: "Equipments Used",
        value: "Tractors, Bull-dozers and Welding Machines",
      },
      {
        label: "Timeline",
        value: "6 Months",
      },
    ],
    stages: [
      {
        label: "Before",
        image: "/e4.jpg",
        imageAlt: "Industrial structure before project phase",
      },
      {
        label: "During",
        image: "/f3.png",
        imageAlt: "Industrial interior during project phase",
      },
      {
        label: "Completed",
        image: "/f1.png",
        imageAlt: "Industrial construction completed project phase",
      },
    ],
  },
};

const Page = ({ params }: ProjectDetailsPageProps) => {
  const details =
    projectDetails[params.id as keyof typeof projectDetails] ??
    projectDetails["1"];

  return (
    <main>
      <ProjectDetailsSection
        title={details.title}
        description={details.description}
        heroImage={details.heroImage}
        heroImageAlt={details.heroImageAlt}
        heroImagePosition={details.heroImagePosition}
        details={details.details}
        stages={details.stages}
      />
    </main>
  );
};

export default Page;
