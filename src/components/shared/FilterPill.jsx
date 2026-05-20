import { BiX } from "react-icons/bi";

/* ═══════════════════════════════════════════
   FILTER PILL  — Shared Component
   Used inside SearchFilterBar
═══════════════════════════════════════════ */
export default function FilterPill({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-[rgba(90,120,99,0.28)] bg-[rgba(90,120,99,0.08)] px-2.5 py-1 text-[11.5px] font-medium text-[#5A7863]">
      {label}
      <button
        onClick={onRemove}
        aria-label="Remove filter"
        className="text-[#90AB8B] transition-colors hover:text-[#5A7863]"
      >
        <BiX className="text-[13px]" />
      </button>
    </span>
  );
}
