const skeletonBox = "animate-pulse rounded-md bg-white/10";

export default function FaqAccordionSkeleton() {
  return (
    <section id="faq" className="bg-black py-8 text-white sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="divide-y divide-white/15">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="py-4 sm:py-5">
              <div className="flex items-center justify-between gap-4">
                <div className={`${skeletonBox} h-6 w-4/5`} />
                <div className={`${skeletonBox} h-6 w-6 rounded-full`} />
              </div>
              {index === 0 ? (
                <div className="mt-4 space-y-2">
                  <div className={`${skeletonBox} h-4 w-full max-w-3xl`} />
                  <div className={`${skeletonBox} h-4 w-2/3`} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
