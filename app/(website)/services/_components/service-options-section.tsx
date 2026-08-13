import ServiceOptionCard from "./service-option-card";

const serviceOptions = [
  {
    title: "Site Preparation",
    description:
      "Professional excavation and land preparation services.",
    image: "/e1.jpg",
    imageAlt: "Prepared site and excavation work",
    href: "/services-details/1",
  },
  {
    title: "Residential Construction",
    description:
      "Building quality homes with expert craftsmanship, durable materials, and attention to every detail.",
    image: "/8676ccd9de21d9db80ce8ecb7303c715b1c548ca.png",
    imageAlt: "Residential construction project",
    href: "/services-details/2",
    reverse: true,
  },
  {
    title: "Commercial Construction",
    description:
      "Reliable commercial construction solutions.",
    image: "/e4.jpg",
    imageAlt: "Commercial construction project",
    href: "/services-details/3",
  },
  {
    title: "Steel Fabrication",
    description:
      "Custom steel fabrication for every project.",
    image: "/e5.jpeg",
    imageAlt: "Steel fabrication and commercial building project",
    href: "/services-details/4",
    reverse: true,
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
