import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  image: string;
  imageAlt: string;
  href?: string;
  imagePosition?: string;
};

export default function ProjectCard({
  title,
  image,
  imageAlt,
  href = "#",
  imagePosition = "center",
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block border-b border-white/10 pb-7"
      aria-label={`View ${title}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-white/10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: imagePosition }}
        />
      </div>

      <div className="mt-3 flex min-h-7 items-center justify-between gap-4">
        <h3 className="text-base font-medium leading-tight text-white transition-colors group-hover:text-[#C88719] sm:text-lg">
          {title}
        </h3>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C88719] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
