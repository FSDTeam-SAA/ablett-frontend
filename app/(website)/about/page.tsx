import Banner from "@/components/common/banner";
import AboutFoundationsSection from "./_components/about-foundations-section";
import ExperienceSection from "./_components/experience-section";
import LeadershipSection from "./_components/leadership-section";
import WhyChooseUs from "@/components/web-componets/why-choose-us";
import ConstructionProcess from "@/components/web-componets/construction-process";

const page = () => {
  return (
    <main>
      <Banner
        image="/about.png"
        imageAlt="Construction equipment on a prepared job site"
        title={
          <>
            Building{" "}
            <span className="font-heading font-medium italic">
              Excellence,
            </span>
            <br />
            <span className="font-heading font-medium italic">
              Creating
            </span>{" "}
            Lasting Value
          </>
        }
        description="Learn more about A7 Property Solutions, our commitment to quality craftsmanship, and the experienced team dedicated to delivering reliable residential and commercial construction solutions."
      />
      <AboutFoundationsSection />
      <LeadershipSection />
       <WhyChooseUs/>
      <ExperienceSection />
       <ConstructionProcess/>
    </main>
  )
}

export default page
