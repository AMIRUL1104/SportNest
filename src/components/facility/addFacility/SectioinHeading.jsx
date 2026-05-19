/* ─────────────────────────────────────────
   Section heading component
───────────────────────────────────────── */
function SectionHeading({ number, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#5A7863] shrink-0">
        <span className="text-[11px] font-bold text-[#EBF4DD]">{number}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon className="text-[16px] text-[#5A7863]" />
        <h2 className="text-[14px] font-semibold text-[#3B4953] tracking-wide">
          {title}
        </h2>
      </div>
      <div className="flex-1 h-px bg-[rgba(144,171,139,0.25)]" />
    </div>
  );
}

export default SectionHeading;
