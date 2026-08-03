import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  image: string;
  href?: string;
  className?: string;
  imageClassName?: string;
}

export default function ProjectCard({
  title,
  image,
  href = "/projects",
  className,
  imageClassName,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn("group block", className)}
    >
      <div className="overflow-hidden rounded-2xl">
        <div className={cn("relative aspect-[16/10]", imageClassName)}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5 sm:gap-4">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[#C88719] sm:text-xl">
          {title}
        </h3>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C88719] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-5 sm:w-5" />
      </div>
    </Link>
  );
}
