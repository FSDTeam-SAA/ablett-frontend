import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceOptionCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
  reverse?: boolean;
};

export default function ServiceOptionCard({
  title,
  description,
  image,
  imageAlt,
  href = "#",
  reverse = false,
}: ServiceOptionCardProps) {
  return (
    <article className="grid gap-5 rounded-[4px] border border-[#767676] bg-[#191919] p-4 sm:p-5 lg:grid-cols-2 lg:items-center lg:gap-7 lg:p-5">
      <div
        className={cn(
          "relative min-h-[200px] overflow-hidden rounded-[4px] border border-[#C88719]/80 sm:min-h-[230px] lg:min-h-[178px]",
          reverse && "lg:order-2"
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div
        className={cn(
          "flex flex-col justify-center px-1 py-2 sm:px-2 lg:min-h-[178px]",
          reverse ? "lg:items-end lg:text-right" : "lg:items-start"
        )}
      >
        <h2 className="text-[21px] font-semibold leading-tight text-white sm:text-[28px] lg:text-[30px]">
          {title}
        </h2>

        <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#D8D8D8] sm:text-base">
          {description}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex h-10 w-fit items-center gap-3 rounded-full bg-[#C88719] px-5 text-sm font-medium text-white transition hover:bg-[#D89A2A] sm:mt-7 sm:h-11 sm:gap-4"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
