import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type BannerProps = {
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  actions?: {
    label: string;
    href: string;
    variant?: "primary" | "outline";
  }[];
};

export default function Banner({
  title,
  description,
  image,
  imageAlt = "Banner background",
  imagePosition = "center",
  actions,
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
        style={{ objectPosition: imagePosition }}
      />
  
      <div className="container relative z-10 mx-auto px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10">
        <h1 className="max-w-[760px] text-[36px] font-normal leading-[1.12] sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px]">
          {title}
        </h1>

        <p className="mt-5 max-w-[740px] text-sm font-light leading-7 text-[#E6E6E6] sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
          {description}
        </p>

        {actions && actions.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center lg:mt-[42px]">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={
                  action.variant === "outline"
                    ? "inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-[#BB7B1D] transition hover:bg-white/85 sm:px-9 sm:text-base"
                    : "inline-flex h-12 items-center justify-center rounded-full bg-[#BB7B1D] px-7 text-sm font-medium text-white transition hover:bg-[#BB7B1D]/85 sm:px-9 sm:text-base"
                }
              >
                {action.label}
                {action.variant === "outline" ? null : (
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                  />
                )}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
