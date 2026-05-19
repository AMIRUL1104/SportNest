"use client";

import FacilityCard from "@/components/shared/FacilityCard/FacilityCard";
import { useState, useMemo, useTransition } from "react";
// import FacilityCard from "@/components/FacilityCard";
import { BiSearch, BiChevronDown, BiX, BiBuildings } from "react-icons/bi";
import EmptyState from "./EmptyState";
import FilterPill from "./FilterPill";
import SkeletonGrid from "./SkeletonGrid";

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
              key={facility._id}
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
