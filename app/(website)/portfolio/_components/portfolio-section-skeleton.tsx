const skeletonCards = Array.from({ length: 6 });

function SkeletonCard() {
  return (
    <div className="border-b border-white/10 pb-7">
      <div className="aspect-[16/9] animate-pulse rounded-md bg-white/10" />
      <div className="mt-3 flex min-h-7 items-center justify-between gap-4">
        <div className="h-5 w-3/5 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-[#C88719]/30" />
      </div>
    </div>
  );
}

export default function PortfolioSectionSkeleton() {
  return (
    <section className="bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-11 w-56 animate-pulse rounded-full bg-white/10 sm:h-14 lg:h-[60px]" />
          <div className="mx-auto mt-4 h-4 w-full max-w-[560px] animate-pulse rounded-full bg-white/10" />
          <div className="mx-auto mt-3 h-4 w-4/5 max-w-[460px] animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="mt-9 grid gap-x-4 gap-y-8 sm:mt-11 sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">
          {skeletonCards.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
