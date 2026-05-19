"use client";

import FacilityCard from "@/components/shared/FacilityCard/FacilityCard";
import { useState, useMemo, useTransition } from "react";
// import FacilityCard from "@/components/FacilityCard";
import { BiSearch, BiChevronDown, BiX, BiBuildings } from "react-icons/bi";

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const FACILITY_TYPES = [
  "Football",
  "Badminton",
  "Tennis",
  "Swimming",
  "Basketball",
  "Cricket",
];

/* ═══════════════════════════════════════════
   FACILITIES CLIENT  — Client Component
═══════════════════════════════════════════ */
export default function FacilitiesClient({ facilities = [] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("");
  const [isPending, startTrans] = useTransition();

  /* ── derived filtered list ── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return facilities.filter((f) => {
      const matchName = !q || f.name.toLowerCase().includes(q);
      const matchType = !typeFilter || f.type === typeFilter;
      return matchName && matchType;
    });
  }, [facilities, search, typeFilter]);

  const hasFilters = search.trim() !== "" || typeFilter !== "";

  const clearFilters = () => {
    startTrans(() => {
      setSearch("");
      setType("");
    });
  };

  /* ── type change with transition ── */
  const handleType = (val) => startTrans(() => setType(val));

  return (
    <div className="flex flex-col gap-6">
      {/* ════ SEARCH & FILTER BAR ════ */}
      <div className="rounded-2xl border border-[rgba(144,171,139,0.22)] bg-white/75 p-4 shadow-[0_2px_16px_rgba(59,73,83,0.06)] backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[16px] text-[#90AB8B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by facility name…"
              className="
                h-11 w-full rounded-xl border bg-[#EBF4DD]/50 pl-10 pr-4
                text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)]
                outline-none transition-all duration-200
                border-[rgba(144,171,139,0.4)]
                focus:border-[#5A7863] focus:bg-white focus:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]
              "
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(59,73,83,0.4)] hover:text-[#3B4953] transition-colors"
                aria-label="Clear search"
              >
                <BiX className="text-[17px]" />
              </button>
            )}
          </div>

          {/* Type filter dropdown */}
          <div className="relative min-w-[180px]">
            <BiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#90AB8B]" />
            <select
              value={typeFilter}
              onChange={(e) => handleType(e.target.value)}
              className="
                h-11 w-full cursor-pointer appearance-none rounded-xl border
                bg-[#EBF4DD]/50 pl-3.5 pr-9 text-[13.5px] outline-none
                transition-all duration-200
                border-[rgba(144,171,139,0.4)]
                focus:border-[#5A7863] focus:bg-white focus:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]
                text-[#3B4953]
              "
            >
              <option value="">All Types</option>
              {FACILITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters button */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="
                flex h-11 items-center gap-1.5 rounded-xl border
                border-[rgba(144,171,139,0.4)] bg-transparent px-4
                text-[13px] font-medium text-[rgba(59,73,83,0.65)]
                transition-all duration-200
                hover:border-[#5A7863] hover:bg-[rgba(235,244,221,0.7)] hover:text-[#3B4953]
                whitespace-nowrap
              "
            >
              <BiX className="text-[15px]" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ════ RESULT SUMMARY ════ */}
      <div className="flex items-center justify-between px-0.5">
        <p className="text-[13px] text-[rgba(59,73,83,0.55)]">
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#90AB8B] border-t-transparent" />
              Filtering…
            </span>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-[#3B4953]">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#3B4953]">
                {facilities.length}
              </span>{" "}
              facilit{facilities.length === 1 ? "y" : "ies"}
              {hasFilters && (
                <span className="ml-1 text-[#5A7863]">· filtered</span>
              )}
            </>
          )}
        </p>

        {/* active filter pills */}
        {hasFilters && (
          <div className="flex items-center gap-2">
            {search && (
              <FilterPill
                label={`"${search}"`}
                onRemove={() => setSearch("")}
              />
            )}
            {typeFilter && (
              <FilterPill label={typeFilter} onRemove={() => handleType("")} />
            )}
          </div>
        )}
      </div>

      {/* ════ GRID ════ */}
      {isPending ? (
        <SkeletonGrid />
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((facility) => (
            <FacilityCard
              key={facility._id ?? facility.id}
              facility={facility}
              variant="browse"
            />
          ))}
        </div>
      ) : (
        <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Filter pill
───────────────────────────────────────── */
function FilterPill({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-[rgba(90,120,99,0.3)] bg-[rgba(90,120,99,0.1)] px-2.5 py-1 text-[11.5px] font-medium text-[#5A7863]">
      {label}
      <button
        onClick={onRemove}
        className="text-[#90AB8B] transition-colors hover:text-[#5A7863]"
        aria-label="Remove filter"
      >
        <BiX className="text-[13px]" />
      </button>
    </span>
  );
}

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

/* ─────────────────────────────────────────
   Empty state
───────────────────────────────────────── */
function EmptyState({ hasFilters, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(144,171,139,0.35)] bg-white/50 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(144,171,139,0.15)]">
        <BiBuildings className="text-[32px] text-[rgba(144,171,139,0.6)]" />
      </div>

      <h3 className="mb-1.5 text-[16px] font-semibold text-[#3B4953]">
        {hasFilters ? "No facilities found" : "No facilities yet"}
      </h3>

      <p className="mb-5 max-w-[280px] text-[13px] leading-relaxed text-[rgba(59,73,83,0.5)]">
        {hasFilters
          ? "Try adjusting your search or filter — or clear them to see all available facilities."
          : "Facilities will appear here once they are added to the platform."}
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="
            flex items-center gap-1.5 rounded-xl border
            border-[rgba(144,171,139,0.4)] bg-white px-5 py-2.5
            text-[13px] font-medium text-[#3B4953]
            transition-all duration-200
            hover:border-[#5A7863] hover:bg-[rgba(235,244,221,0.7)]
          "
        >
          <BiX className="text-[15px]" />
          Clear filters
        </button>
      )}
    </div>
  );
}
