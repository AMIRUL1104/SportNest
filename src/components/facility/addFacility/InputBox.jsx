/* ─────────────────────────────────────────
   Input box
───────────────────────────────────────── */
function InputBox({ icon: Icon, error, children }) {
  return (
    <div
      className={`
      flex items-center gap-2.5 px-3.5 h-11 rounded-xl
      border transition-all duration-200
      ${
        error
          ? "border-red-400 bg-red-50/40"
          : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
      }
    `}
    >
      {Icon && <Icon className="text-[16px] text-[#90AB8B] shrink-0" />}
      {children}
    </div>
  );
}

export default InputBox;
