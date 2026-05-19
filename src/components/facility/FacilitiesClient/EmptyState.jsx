import { BiBuildings, BiX } from "react-icons/bi";

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

      <p className="mb-5 max-w-70 text-[13px] leading-relaxed text-[rgba(59,73,83,0.5)]">
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

export default EmptyState;
