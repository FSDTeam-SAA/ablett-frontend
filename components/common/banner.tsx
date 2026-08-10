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
    <section className="relative flex min-h-[390px] items-center overflow-hidden bg-black pt-20 text-white sm:min-h-[470px] sm:pt-24 lg:min-h-[556px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        quality={100}
        sizes="100vw"
        className="z-0 object-cover"
      />
  
      <div className="container relative z-10 mx-auto px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10">
        <h1 className="max-w-[760px] text-[36px] font-normal leading-[1.12] sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px]">
          {title}
        </h1>

        <p className="mt-5 max-w-[740px] text-sm font-light leading-7 text-[#E6E6E6] sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
