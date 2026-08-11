const stageSkeletons = Array.from({ length: 3 });
const detailSkeletons = Array.from({ length: 6 });
const processSkeletons = Array.from({ length: 4 });

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-white/10 ${className ?? ""}`}
    />
  );
}

export default function ProjectDetailsSkeleton() {
  return (
    <section className="bg-black pb-14 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mx-auto">
          <div>
            <SkeletonLine className="h-8 w-full max-w-xl sm:h-9" />
            <SkeletonLine className="mt-3 h-4 w-full max-w-4xl" />
            <SkeletonLine className="mt-3 h-4 w-4/5 max-w-3xl" />
          </div>

          <div className="mt-7 aspect-[16/10] min-h-[220px] animate-pulse rounded-md bg-white/10 sm:mt-10 sm:aspect-[16/7.4] sm:min-h-[320px] lg:min-h-[510px]" />

          <div className="mt-7 grid gap-5 sm:mt-8 sm:grid-cols-1 sm:gap-6 lg:grid-cols-1">
            {detailSkeletons.map((_, index) => (
              <div key={index} className="lg:max-w-[340px]">
                <SkeletonLine className="h-8 w-40 sm:h-9" />
                <SkeletonLine className="mt-3 h-4 w-full" />
                <SkeletonLine className="mt-3 h-4 w-5/6" />
              </div>
            ))}
          </div>

          <div className="mt-9 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {stageSkeletons.map((_, index) => (
              <div key={index}>
                <div className="aspect-[16/12] animate-pulse rounded-md bg-white/10" />
                <SkeletonLine className="mt-3 h-8 w-32 sm:h-9" />
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-9">
            <SkeletonLine className="h-8 w-56 sm:h-9" />
            <div className="mt-4 space-y-4">
              {processSkeletons.map((_, index) => (
                <div key={index}>
                  <SkeletonLine className="h-7 w-48 sm:h-8" />
                  <SkeletonLine className="mt-3 h-4 w-full" />
                  <SkeletonLine className="mt-3 h-4 w-11/12" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-9">
            <SkeletonLine className="h-8 w-52 sm:h-9" />
            <SkeletonLine className="mt-4 h-4 w-full" />
            <SkeletonLine className="mt-3 h-4 w-10/12" />
          </div>
        </div>
      </div>
    </section>
  );
}
