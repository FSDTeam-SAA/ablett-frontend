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
    <section className="bg-black py-14 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-6">
        {/* Heading */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="text-[34px] font-light leading-tight text-white sm:text-4xl md:text-5xl">
            Powerful{" "}
            <span className="font-serif italic">
              Equipment
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/60 sm:mt-5 sm:text-lg sm:leading-8">
            Our modern fleet of heavy equipment enables us to
            deliver residential, commercial, site preparation,
            and fabrication projects safely, efficiently, and
            on schedule.
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
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
