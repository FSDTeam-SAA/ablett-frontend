import Image from "next/image";
import type { ReactNode } from "react";

type BannerProps = {
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
};

export default function Banner({
  title,
  description,
  image,
  imageAlt = "Banner background",
}: BannerProps) {
  return (
    <section className="relative flex min-h-[500px] items-center overflow-hidden bg-black pt-24 text-white sm:min-h-[560px] lg:min-h-[556px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />

      <div className="container relative z-10 mx-auto px-5 pb-14 pt-16 sm:px-8 lg:px-10">
        <h1 className="max-w-[760px] text-[42px] font-normal leading-[1.14] sm:text-6xl lg:text-[60px] xl:text-[68px]">
          {title}
        </h1>

        <p className="mt-7 max-w-[740px] text-base font-light leading-8 text-[#E6E6E6] sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
