import Banner from "@/components/common/banner";
import ServiceOptionsSection from "./_components/service-options-section";

const page = () => {
  return (
    <main>
      <Banner
        image="/410_Arkansas_Rd_Photo_04.jpg"
        imageAlt="Construction site with cranes and a building structure"
        title={
          <>
            Construction{" "}
            <span className="font-heading font-medium italic">Solutions</span>
            <br />
            <span className="font-heading font-medium italic">Tailored</span>{" "}
            to Your Needs
          </>
        }
        description="Explore our comprehensive range of construction services, from residential and commercial projects to site preparation and welding, all delivered with quality, precision, and professionalism."
      />
      <ServiceOptionsSection />
    </main>
  );
};

export default page;
