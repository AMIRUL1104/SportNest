import { BiX } from "react-icons/bi";

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

export default FilterPill;
