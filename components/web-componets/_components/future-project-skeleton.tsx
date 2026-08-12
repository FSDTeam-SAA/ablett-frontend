import Link from "next/link";
import { ArrowRight } from "lucide-react";

const skeletonCards = Array.from({ length: 3 });

function SkeletonCard() {
  return (
    <div className="block">
      <div className="aspect-video animate-pulse rounded-md bg-white/10" />
      <div className="mt-2 flex min-h-6 items-center justify-between gap-3">
        <div className="h-5 w-3/5 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-[#C9871B]/30" />
      </div>
    </div>
  );
}

export default function FutureProjectSkeleton() {
  return (
    <section id="portfolio" className="bg-black py-14 sm:py-16 md:py-20 lg:py-[120px]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between lg:gap-8">
          <div className="text-white">
            <h2 className="text-[30px] font-normal leading-[1.15] sm:text-[38px] lg:text-[42px]">
              Built to Perform.{" "}
              <span className="font-heading font-medium italic">
                Designed
              </span>{" "}
              to Last.
            </h2>

            <p className="mt-3 max-w-[500px] text-sm leading-6 text-[#E6E6E6] sm:text-base sm:leading-[1.45]">
              Explore a selection of residential, commercial, and site
              development projects completed by our team.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-[#C9871B] px-5 text-sm font-medium text-white transition-colors hover:bg-[#d89727] sm:h-11 sm:px-6 md:mt-6"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
          {skeletonCards.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
