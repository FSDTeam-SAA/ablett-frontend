import EquipmentCard from "../common/equipment-card";


const equipments = [
  {
    title: "Excavators",
    image: "/images/equipment/excavator.jpg",
  },
  {
    title: "Wheel Loaders",
    image: "/images/equipment/wheel-loader.jpg",
  },
  {
    title: "Dump Trucks",
    image: "/images/equipment/dump-truck.jpg",
  },
  {
    title: "Skid Steers",
    image: "/images/equipment/skid-steer.jpg",
  },
  {
    title: "Bulldozers",
    image: "/images/equipment/bulldozer.jpg",
  },
  {
    title: "Foundation Equipment",
    image: "/images/equipment/foundation.jpg",
  },
  {
    title: "Welding & Fabrication",
    image: "/images/equipment/welding.jpg",
  },
  {
    title: "Compaction Equipment",
    image: "/images/equipment/compaction.jpg",
  },
];

export default function EquipmentSection() {
  return (
    <section className="bg-black py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-4xl font-light text-white md:text-5xl">
            Powerful{" "}
            <span className="font-serif italic">
              Equipment
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/60">
            Our modern fleet of heavy equipment enables us to
            deliver residential, commercial, site preparation,
            and fabrication projects safely, efficiently, and
            on schedule.
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.title}
              title={equipment.title}
              image={equipment.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}