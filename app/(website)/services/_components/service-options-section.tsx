import ServiceOptionCard from "./service-option-card";

const serviceOptions = [
  {
    title: "Excavation & Site Preparation",
    description:
      "Clearing, excavation, rough grading, building pads, demolition, and site access.",
    image: "/excavation4 (1).jpg",
    imageAlt: "Excavator moving soil on a construction site",
    href: "/services-details/1",
  },
  {
    title: "Residential",
    description:
      "Brush, trees, finish grading, erosion control, and property preparation.",
    image: "/8676ccd9de21d9db80ce8ecb7303c715b1c548ca.png",
    imageAlt: "Prepared land with foundation forms and grading work",
    href: "/services-details/2",
    reverse: true,
  },
  {
    title: "Commercial",
    description:
      "Building foundations, concrete work, site preparation, and construction.",
    image: "/f1.png",
    imageAlt: "Heavy equipment preparing road base on a construction site",
    href: "/services-details/3",
  },
];

export default function ServiceOptionsSection() {
  return (
    <section className="bg-black py-14 sm:py-16 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="space-y-7 lg:space-y-9">
          {serviceOptions.map((service) => (
            <ServiceOptionCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
              imageAlt={service.imageAlt}
              href={service.href}
              reverse={service.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
