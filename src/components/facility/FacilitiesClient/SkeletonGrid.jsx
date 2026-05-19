/* ─────────────────────────────────────────
   Skeleton grid
───────────────────────────────────────── */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(144,171,139,0.18)] bg-white/70 shadow-[0_2px_12px_rgba(59,73,83,0.06)]"
        >
          {/* image skeleton */}
          <div className="h-48 w-full animate-pulse bg-[rgba(144,171,139,0.18)]" />
          <div className="flex flex-col gap-3 p-4">
            {/* title */}
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-[rgba(144,171,139,0.2)]" />
            {/* location */}
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-[rgba(144,171,139,0.15)]" />
            {/* stats */}
            <div className="flex gap-3">
              <div className="h-3 w-20 animate-pulse rounded-lg bg-[rgba(144,171,139,0.15)]" />
              <div className="h-3 w-16 animate-pulse rounded-lg bg-[rgba(144,171,139,0.15)]" />
            </div>
            {/* price + button */}
            <div className="mt-2 flex items-center justify-between border-t border-[rgba(144,171,139,0.1)] pt-3">
              <div className="h-5 w-20 animate-pulse rounded-lg bg-[rgba(144,171,139,0.2)]" />
              <div className="h-8 w-24 animate-pulse rounded-xl bg-[rgba(90,120,99,0.15)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;
