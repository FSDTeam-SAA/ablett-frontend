const skeletonBox = "animate-pulse rounded-md bg-white/10";

export default function ServiceDetailsFaqSkeleton() {
  return (
    <section className="bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="container mx-auto grid gap-9 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-10">
        <div className="relative mx-auto w-full max-w-[430px] pb-8 pr-3 sm:pb-10 sm:pr-0 lg:mx-0">
          <div className="absolute left-0 top-0 h-[84%] w-[74%] rounded-lg bg-[#BB7B1D]/70" />
          <div
            className={`${skeletonBox} relative ml-auto mt-8 aspect-[0.84] w-[88%] sm:mt-9`}
          />
        </div>

        <div>
          <div className={`${skeletonBox} h-10 w-full max-w-[420px]`} />

          <div className="mt-5 divide-y divide-white/15 sm:mt-7">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="py-4 sm:py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className={`${skeletonBox} h-5 w-4/5`} />
                  <div className={`${skeletonBox} h-6 w-6 rounded-full`} />
                </div>
                {index === 0 ? (
                  <div className="mt-4 space-y-2">
                    <div className={`${skeletonBox} h-4 w-full max-w-[650px]`} />
                    <div className={`${skeletonBox} h-4 w-2/3`} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
