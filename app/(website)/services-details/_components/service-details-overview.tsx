import Image from "next/image";

type OverviewImage = {
  src: string;
  alt: string;
};

type OverviewBlock = {
  title: string;
  description: string;
};

type ServiceDetailsOverviewProps = {
  title: string;
  images: {
    feature: OverviewImage;
    top: OverviewImage;
    bottom: OverviewImage;
  };
  blocks: OverviewBlock[];
};

export default function ServiceDetailsOverview({
  title,
  images,
  blocks,
}: ServiceDetailsOverviewProps) {
  return (
    <section className="bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-4xl text-[30px] font-semibold leading-tight sm:text-[40px] md:text-5xl lg:text-[44px]">
          {title}
        </h2>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-3">
          {[images.feature, images.top, images.bottom].map((image) => (
            <div
              key={image.src}
              className="relative h-[220px] overflow-hidden rounded-md sm:h-[280px] lg:h-[300px]  xl:h-[480px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-7 space-y-7 sm:mt-8 sm:space-y-8">
          {blocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-2xl font-semibold leading-tight sm:text-[28px]">
                {block.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#D8D8D8] sm:text-base">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
