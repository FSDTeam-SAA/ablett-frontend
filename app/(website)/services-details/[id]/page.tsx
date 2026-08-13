import Banner from "@/components/common/banner";
import ServiceDetailsOverview from "../_components/service-details-overview";
import ServiceDetailsEquipment from "../_components/service-details-equipment";
import ServiceDetailsFaq from "../_components/service-details-faq";
import ConstructionProcess from "@/components/web-componets/construction-process";
import SitePrepDetails from "../_components/site-prep-details";
import CommercialConstructionDetails from "../_components/commercial-construction-details";
import SteelFabricationDetails from "../_components/steel-fabrication-details";

type ServiceDetailsPageProps = {
  params: {
    id: string;
  };
};

const serviceDetails = {
  "1": {
    image: "/service22.jpeg",
    imageAlt: "Tractor grading freshly prepared land near a shop building",
    imagePosition: undefined,
    title: (
      <>
        Excavation &amp;
        <br />
        <span className="font-heading font-medium italic">
          Site Preparation
        </span>
      </>
    ),
    description:
      "From raw land to build-ready ground, A7 Property Solutions provides dependable excavation and site preparation services for residential, commercial, and agricultural projects across North Texas and Southern Oklahoma.",
    actions: [
      {
        label: "Request a Quote",
        href: "/request-quote",
      },
      {
        label: "View Our Projects",
        href: "/portfolio",
        variant: "outline" as const,
      },
    ],
    overview: {
      title: "Comprehensive Site Preparation Solutions  ",
      images: {
        feature: {
          src: "/e1.jpg",
          alt: "Finished grading pattern across an excavated property",
        },
        top: {
          src: "/excavation4 (1).jpg",
          alt: "Land clearing and grading equipment on a rural property",
        },
        bottom: {
          src: "/e3.jpg",
          alt: "Prepared dirt pad and access area after excavation work",
        },
      },
      blocks: [
        {
          title: "What A7 Provides",
          description:
            "Our site preparation work covers land clearing, brush removal, rough and finish grading, driveway and access preparation, pad preparation, drainage support, and hauling. We shape each property with practical planning, dependable communication, and careful equipment operation so construction can begin on stable, properly prepared ground.",
        },
        {
          title: "Common Problems Solved",
          description:
            "Uneven land, poor drainage, overgrown brush, unstable building pads, and difficult site access can slow down a project before construction starts. A7 prepares the property correctly from the beginning, helping reduce delays, improve usability, and create a cleaner foundation for homes, shops, barns, fencing, and other improvements.",
        },
      ],
    },
    equipment: {
      images: [
        {
          src: "/e2.png",
          alt: "Heavy equipment grading a cleared property",
          position: "center",
        },
        {
          src: "/e4.jpg",
          alt: "Freshly graded soil ready for construction",
        },
        {
          src: "/e5.jpeg",
          alt: "Excavation equipment preparing a construction site",
        },
      ],
      title: "Built on Integrity. Focused on Results.",
      description:
        "Every job is handled with careful scheduling, clear communication, reliable equipment, and quality workmanship. Whether the property needs brush cleared, a driveway opened, a pad prepared, or drainage improved, our crew keeps the work practical, efficient, and ready for the next stage.",
      items: [
        "Land clearing",
        "Brush removal",
        "Site grading",
        "Pad preparation",
        "Driveway access",
        "Drainage support",
      ],
    },
  },
  "2": {
    image: "/8676ccd9de21d9db80ce8ecb7303c715b1c548ca.png",
    imageAlt: "Residential home construction in progress",
    imagePosition: undefined,
    title: (
      <>
        Your Dream Home,
        <br />
        <span className="font-heading font-medium italic">
          Masterfully Built
        </span>
      </>
    ),
    description:
      "Custom homes from raw land to final handover - built to your vision with full in-house crew and equipment. We specialize in rural and acreage builds across North Texas, including the 410 Arkansas Rd project in Sadler, TX.",
    actions: undefined,
    overview: {
      title: "From full remodels to new builds",
      images: {
        feature: {
          src: "/b1.jpg",
          alt: "Prepared land and site foundation work",
        },
        top: {
          src: "/b2.jpg",
          alt: "Excavation equipment working over prepared ground",
        },
        bottom: {
          src: "/b3.jpg",
          alt: "Excavator moving soil for site preparation",
        },
      },
      blocks: [
        {
          title: "What A7 Provides",
          description:
            "At A7 Property Solutions, we believe every home should be as unique as the family living in it. Building a home is one of life's biggest investments, and we are committed to making that journey smooth, transparent, and rewarding. From the very first consultation, we take the time to understand your vision, lifestyle, budget, and long-term goals, ensuring every detail is thoughtfully planned to create a home that reflects your personality while delivering lasting comfort, functionality, and value.",
        },
        {
          title: "Common Problems Solved",
          description:
            "At A7 Property Solutions, we believe every home should be as unique as the family living in it. Building a home is one of life's biggest investments, and we are committed to making that journey smooth, transparent, and rewarding. From the very first consultation, we take the time to understand your vision, lifestyle, budget, and long-term goals, ensuring every detail is thoughtfully planned to create a home that reflects your personality while delivering lasting comfort, functionality, and value.",
        },
      ],
    },
    equipment: {
      images: [
        {
          src: "/sd1.jpg",
          alt: "Welding and metal framing work inside a building",
        },
        {
          src: "/sd3.jpeg",
          alt: "Foundation forms and site preparation work",
        },
        {
          src: "/sd2.jpeg",
          alt: "Concrete wall and graded soil at a construction site",
       
        },
      ],
      title: "Quality and Workmanship that lasts",
      description:
        "At A7 Property Solutions, we believe every home should be as unique as the family living in it. Building a home is one of life's biggest investments, and we are committed to making that journey smooth, transparent, and rewarding. From the very first consultation, we take the time to understand your vision, lifestyle, budget, and long-term goals, ensuring every detail is thoughtfully planned to create a home that reflects your personality while delivering lasting comfort, functionality, and value.",
      items: ["residential", "house-building",],
    },
  },
  "3": {
    image: "/newcomersial.jpeg",
    imageAlt: "Commercial metal building with overhead shop doors",
    imagePosition: undefined,
    title: (
      <>
        Commercial
        <br />
        <span className="font-heading font-medium italic">
          Construction
        </span>
      </>
    ),
    description:
      "Built for business. Built to last. A7 Property Solutions provides comprehensive commercial construction services for businesses, property owners, developers, and agricultural operations throughout North Texas and Southern Oklahoma.",
    actions: [
      {
        label: "Request a Quote",
        href: "/request-quote",
      },
      {
        label: "View Our Projects",
        href: "/portfolio",
        variant: "outline" as const,
      },
    ],
    overview: {
      title: "Commercial Construction Support from Groundwork to Finish",
      images: {
        feature: {
          src: "/f1.png",
          alt: "Commercial site preparation with compacted road base",
        },
        top: {
          src: "/f2.png",
          alt: "Equipment and materials on a commercial construction site",
        },
        bottom: {
          src: "/f3.png",
          alt: "Finished commercial pad and access area",
        },
      },
      blocks: [
        {
          title: "What A7 Provides",
          description:
            "A7 Property Solutions helps commercial clients prepare and complete practical construction scopes including site grading, building pads, concrete preparation, shop and metal building support, access preparation, and exterior improvements. We coordinate the work around real project needs so crews can move efficiently from one phase to the next.",
        },
        {
          title: "Common Problems Solved",
          description:
            "Commercial projects need steady communication, reliable scheduling, and clean execution. We help address site access issues, unfinished pads, drainage concerns, utility-ready preparation, and coordination gaps that can create delays or costly rework.",
        },
      ],
    },
    equipment: {
      images: [
        {
          src: "/build.png",
          alt: "Commercial building exterior and construction work",
        },
        {
          src: "/build1.png",
          alt: "Large commercial construction project in progress",
        },
        {
          src: "/build3.png",
          alt: "Commercial building construction with structural work",
        },
      ],
      title: "Dependable Execution for Business Properties",
      description:
        "From the first site walk to the final cleanup, our team focuses on durable work, clear communication, and jobsite readiness. The result is a commercial property prepared for daily use and long-term value.",
      items: [
        "Commercial pads",
        "Concrete prep",
        "Metal buildings",
        "Access routes",
        "Site coordination",
        "Exterior improvements",
      ],
    },
  },
  "4": {
    image: "/e5.jpeg",
    imageAlt: "Steel fabrication work on a structural frame",
    imagePosition: "center 34%",
    title: (
      <>
        Steel
        <br />
        <span className="font-heading font-medium italic">
          Fabrication
        </span>
      </>
    ),
    description:
      "Custom steel solutions built for strength, function, and long-term performance. A7 Property Solutions delivers steel fabrication for residential, commercial, agricultural, and ranch properties across North Texas and Southern Oklahoma.",
    actions: [
      {
        label: "Request a Quote",
        href: "/request-quote",
      },
      {
        label: "View Our Projects",
        href: "/portfolio",
        variant: "outline" as const,
      },
    ],
    overview: {
      title: "Complete Steel Fabrication Solutions",
      images: {
        feature: {
          src: "/build4.png",
          alt: "Steel frame welding and fabrication",
        },
        top: {
          src: "/sd1.jpg",
          alt: "Steel fabrication work inside a construction project",
        },
        bottom: {
          src: "/sd2.jpeg",
          alt: "Steel and concrete construction detail",
        },
      },
      blocks: [],
    },
    equipment: {
      images: [
        {
          src: "/build4.png",
          alt: "Steel workers welding a frame",
        },
        {
          src: "/e5.jpeg",
          alt: "Commercial steel building on prepared ground",
        },
        {
          src: "/sd3.jpeg",
          alt: "Construction site steel and foundation work",
        },
      ],
      title: "Custom Steel Solutions Built to Last",
      description:
        "From pipe fencing and custom entrances to steel bridge crossings, pond docks, and structural components, we build with precision, premium materials, and a commitment to quality that stands the test of time.",
      items: [
        "pipe-fencing",
        "steel-gates",
        "bridge-crossings",
        "pond-docks",
        "custom-fabrication",
      ],
    },
  },
};

const page = ({ params }: ServiceDetailsPageProps) => {
  const details =
    serviceDetails[params.id as keyof typeof serviceDetails] ??
    serviceDetails["1"];
  const isSitePrepPage = params.id === "1" || !serviceDetails[params.id as keyof typeof serviceDetails];
  const isCommercialPage = params.id === "3";
  const isSteelFabricationPage = params.id === "4";

  return (
    <main>
      <Banner
        image={details.image}
        imageAlt={details.imageAlt}
        imagePosition={details.imagePosition}
        title={details.title}
        description={details.description}
        actions={details.actions}
      />
      {isSitePrepPage ? (
        <SitePrepDetails />
      ) : isCommercialPage ? (
        <CommercialConstructionDetails />
      ) : isSteelFabricationPage ? (
        <SteelFabricationDetails />
      ) : (
        <>
          <ServiceDetailsOverview
            title={details.overview.title}
            images={details.overview.images}
            blocks={details.overview.blocks}
          />
          <ServiceDetailsEquipment
            images={details.equipment.images}
            title={details.equipment.title}
            description={details.equipment.description}
            items={details.equipment.items}
          />
        </>
      )}
      <ConstructionProcess />
      <ServiceDetailsFaq />
    </main>
  );
};

export default page;
