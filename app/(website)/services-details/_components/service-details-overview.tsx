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
    <section className="bg-black py-14 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-4xl text-[34px] font-semibold leading-tight sm:text-5xl lg:text-[44px]">
          {title}
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden rounded-md sm:min-h-[360px] lg:min-h-[380px]">
            <Image
              src={images.feature.src}
              alt={images.feature.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[190px] overflow-hidden rounded-md sm:min-h-[230px] lg:min-h-0">
              <Image
                src={images.top.src}
                alt={images.top.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="relative min-h-[190px] overflow-hidden rounded-md sm:min-h-[230px] lg:min-h-0">
              <Image
                src={images.bottom.src}
                alt={images.bottom.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
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
