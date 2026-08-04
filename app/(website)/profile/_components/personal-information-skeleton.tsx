const skeletonBox = "animate-pulse rounded-md bg-white/10";

function SkeletonField({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className={`${skeletonBox} mb-2 h-4 w-28`} />
      <div className={`${skeletonBox} h-[42px] w-full`} />
    </div>
  );
}

export default function PersonalInformationSkeleton() {
  return (
    <section className="rounded-lg bg-[#333333] p-4 text-white sm:p-6">
      <div className={`${skeletonBox} h-8 w-60`} />
      <div className={`${skeletonBox} mt-3 h-4 w-full max-w-sm`} />

      <div className="mt-6 flex items-center gap-4">
        <div className={`${skeletonBox} h-24 w-24 rounded-full`} />
        <div className="space-y-3">
          <div className={`${skeletonBox} h-5 w-36`} />
          <div className={`${skeletonBox} h-4 w-48`} />
          <div className={`${skeletonBox} h-9 w-28 rounded-full`} />
        </div>
      </div>

      <div className="mt-6 flex gap-5">
        <div className={`${skeletonBox} h-5 w-20`} />
        <div className={`${skeletonBox} h-5 w-24`} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField className="sm:col-span-2" />
        <SkeletonField />
        <SkeletonField />
      </div>
    </section>
  );
}
