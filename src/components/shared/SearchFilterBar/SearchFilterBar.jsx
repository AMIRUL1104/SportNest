"use client";

import { BiSearch, BiChevronDown, BiX } from "react-icons/bi";
import FilterPill from "../FilterPill";

const FACILITY_TYPES = [
  "Football",
  "Badminton",
  "Tennis",
  "Swimming",
  "Basketball",
  "Cricket",
];

/* ═══════════════════════════════════════════
   SEARCH FILTER BAR  — Shared Client Component
   Used by: AllFacilitiesPage + ManageFacilitiesPage
═══════════════════════════════════════════ */
export default function SearchFilterBar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  placeholder = "Search facilities…",
}) {
  const hasFilters = search.trim() !== "" || typeFilter !== "";

  return (
    <div className="rounded-2xl border border-[rgba(144,171,139,0.22)] bg-white/75 p-4 shadow-[0_2px_16px_rgba(59,73,83,0.06)] backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* ── Search ── */}
        <div className="relative flex-1">
          <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[16px] text-[#90AB8B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="
              h-11 w-full rounded-xl border bg-[#EBF4DD]/50 pl-10 pr-10
              text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)]
              outline-none transition-all duration-200
              border-[rgba(144,171,139,0.4)]
              focus:border-[#5A7863] focus:bg-white focus:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]
            "
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(59,73,83,0.38)] transition-colors hover:text-[#3B4953]"
            >
              <BiX className="text-[17px]" />
            </button>
          )}
        </div>

        {/* ── Type filter ── */}
        <div className="relative min-w-[180px]">
          <BiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#90AB8B]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="
              h-11 w-full cursor-pointer appearance-none rounded-xl border
              bg-[#EBF4DD]/50 pl-3.5 pr-9 text-[13.5px] text-[#3B4953]
              outline-none transition-all duration-200
              border-[rgba(144,171,139,0.4)]
              focus:border-[#5A7863] focus:bg-white focus:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]
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

        {/* ── Clear all ── */}
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("");
            }}
            className="
              flex h-11 items-center gap-1.5 whitespace-nowrap rounded-xl border
              border-[rgba(144,171,139,0.4)] bg-transparent px-4
              text-[13px] font-medium text-[rgba(59,73,83,0.65)]
              transition-all duration-200
              hover:border-[#5A7863] hover:bg-[rgba(235,244,221,0.7)] hover:text-[#3B4953]
            "
          >
            <BiX className="text-[15px]" />
            Clear
          </button>
        )}
      </div>

      {/* ── Active filter pills ── */}
      {hasFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[rgba(144,171,139,0.15)] pt-3">
          <span className="text-[11px] text-[rgba(59,73,83,0.4)]">Active:</span>
          {search && (
            <FilterPill label={`"${search}"`} onRemove={() => setSearch("")} />
          )}
          {typeFilter && (
            <FilterPill label={typeFilter} onRemove={() => setTypeFilter("")} />
          )}
        </div>
      )}
    </div>
  );
}
