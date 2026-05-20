/* ═══════════════════════════════════════════
   FACILITY SKELETON  — Shared Component
   variant: "browse" | "manage"
   Used by: AllFacilitiesPage + ManageFacilitiesPage
═══════════════════════════════════════════ */
export default function FacilitySkeleton({ variant = "browse", count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-[rgba(144,171,139,0.18)] bg-white/70 shadow-[0_2px_12px_rgba(59,73,83,0.05)]"
        >
          {/* image */}
          <div className="relative h-48 w-full animate-pulse bg-[rgba(144,171,139,0.18)]">
            {/* type badge placeholder */}
            <div className="absolute left-3 top-3 h-6 w-20 animate-pulse rounded-full bg-[rgba(144,171,139,0.28)]" />
            {/* manage: booking count badge */}
            {variant === "manage" && (
              <div className="absolute right-3 top-3 h-6 w-24 animate-pulse rounded-full bg-[rgba(59,73,83,0.18)]" />
            )}
            {/* browse/featured: rating badge */}
            {variant !== "manage" && (
              <div className="absolute right-3 top-3 h-6 w-14 animate-pulse rounded-full bg-white/50" />
            )}
          </div>

          {/* content */}
          <div className="flex flex-col gap-3 p-4">
            {/* title */}
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-[rgba(144,171,139,0.22)]" />
            {/* location */}
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-[rgba(144,171,139,0.16)]" />
            {/* stats row */}
            <div className="flex items-center gap-3">
              <div className="h-3 w-20 animate-pulse rounded-lg bg-[rgba(144,171,139,0.16)]" />
              <div className="h-3 w-px bg-[rgba(144,171,139,0.2)]" />
              <div className="h-3 w-16 animate-pulse rounded-lg bg-[rgba(144,171,139,0.16)]" />
            </div>

            {/* price + action */}
            <div className="mt-2 flex items-center justify-between border-t border-[rgba(144,171,139,0.12)] pt-3">
              {/* price */}
              <div className="h-5 w-20 animate-pulse rounded-lg bg-[rgba(144,171,139,0.22)]" />

              {/* browse → single button */}
              {variant !== "manage" && (
                <div className="h-8 w-24 animate-pulse rounded-xl bg-[rgba(90,120,99,0.15)]" />
              )}

              {/* manage → two buttons */}
              {variant === "manage" && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-[rgba(144,171,139,0.18)]" />
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-[rgba(239,68,68,0.1)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
