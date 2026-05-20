import Link from "next/link";
import { BiBuildings, BiX, BiPlus } from "react-icons/bi";

/* ═══════════════════════════════════════════
   EMPTY STATE  — Shared Component
   variant: "browse" | "manage"
   Used by: AllFacilitiesPage + ManageFacilitiesPage
═══════════════════════════════════════════ */
export default function EmptyState({
  variant = "browse",
  hasFilters = false,
  onClear,
}) {
  /* text config per variant + filter state */
  const config = hasFilters
    ? {
        title: "No facilities found",
        subtitle:
          "Try adjusting your search or filter — or clear them to see all available facilities.",
        showClear: true,
        showCTA: false,
      }
    : variant === "manage"
      ? {
          title: "No facilities added yet",
          subtitle:
            "Start by creating your first sports facility and reach players near you.",
          showClear: false,
          showCTA: true,
        }
      : {
          title: "No facilities available",
          subtitle: "Check back later or try a different search.",
          showClear: false,
          showCTA: false,
        };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(144,171,139,0.35)] bg-white/50 py-24 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[rgba(144,171,139,0.2)] bg-[rgba(144,171,139,0.1)]">
        <BiBuildings className="text-[38px] text-[rgba(144,171,139,0.55)]" />
      </div>

      <h3 className="mb-2 text-[17px] font-semibold text-[#3B4953]">
        {config.title}
      </h3>
      <p className="mb-6 max-w-[280px] text-[13px] leading-relaxed text-[rgba(59,73,83,0.5)]">
        {config.subtitle}
      </p>

      {config.showClear && onClear && (
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

      {config.showCTA && (
        <Link
          href="/facilities/add-facility"
          className="
            flex items-center gap-2 rounded-xl bg-[#5A7863] px-6 py-2.5
            text-[13.5px] font-semibold text-[#EBF4DD] no-underline
            shadow-[0_2px_12px_rgba(90,120,99,0.28)]
            transition-all duration-200 hover:bg-[#4d6b56] active:scale-[0.98]
          "
        >
          <BiPlus className="text-[17px]" />
          Add Facility
        </Link>
      )}
    </div>
  );
}
