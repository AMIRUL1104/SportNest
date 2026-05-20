import Link from "next/link";
import { getLimitedFacilities } from "@/lib/backend/facilities/data";

import { Suspense } from "react";
import FacilitySkeleton from "../../shared/FacilitySkeleton/FacilitySkeleton";
import EmptyState from "../../shared/EmptyState/EmptyState";
import FacilityCard from "../../shared/FacilityCard/FacilityCard";

// ─── Inner async component (fetches data) ────────────────────────────────────
async function FacilitiesGrid() {
  const featuredData = await getLimitedFacilities();

  if (!featuredData || featuredData.length === 0) {
    return (
      <EmptyState variant="browse" hasFilters={false} onClear={() => {}} />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {featuredData.map((facility) => (
        <FacilityCard
          key={facility._id ?? facility.id}
          facility={facility}
          variant="featured"
        />
      ))}
    </div>
  );
}

// ─── Skeleton fallback ────────────────────────────────────────────────────────
function GridSkeleton() {
  return <FacilitySkeleton variant="browse" count={6} />;
}

// ─── Main section component ───────────────────────────────────────────────────
async function FeaturedFacilities() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          {/* Optional badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            Featured Facilities
          </span>

          {/* Main title */}
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight">
            Find Your Perfect Playground
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
            Explore premium sports facilities for football, cricket, badminton
            and more — all in one place.
          </p>
        </div>

        {/* ── Facilities Grid with Suspense ── */}
        <Suspense fallback={<GridSkeleton />}>
          <FacilitiesGrid />
        </Suspense>

        {/* ── CTA ── */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Explore All Facilities
            {/* Arrow icon — no external dep */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedFacilities;
