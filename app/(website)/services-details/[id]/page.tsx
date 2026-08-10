import Banner from "@/components/common/banner";
import ServiceDetailsOverview from "../_components/service-details-overview";
import ServiceDetailsEquipment from "../_components/service-details-equipment";
import ServiceDetailsFaq from "../_components/service-details-faq";
import ConstructionProcess from "@/components/web-componets/construction-process";

type ServiceDetailsPageProps = {
  params: {
    id: string;
  };
};

const serviceDetails = {
 
  "2": {
    image: "/8676ccd9de21d9db80ce8ecb7303c715b1c548ca.png",
    imageAlt: "Residential home construction in progress",
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
 
};

const page = ({ params }: ServiceDetailsPageProps) => {
  const details =
    serviceDetails[params.id as keyof typeof serviceDetails] ??
    serviceDetails["2"];

  return (
    <main>
      <Banner
        image={details.image}
        imageAlt={details.imageAlt}
        title={details.title}
        description={details.description}
      />
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
      <ConstructionProcess />
      <ServiceDetailsFaq />
    </main>
  );
};

export default page;
