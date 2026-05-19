import { BiInfoCircle } from "react-icons/bi";

/* ─────────────────────────────────────────
   Field wrapper
───────────────────────────────────────── */
function FieldWrapper({ label, required, helper, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
        {label}
        {required && <span className="text-[#5A7863] ml-0.5">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p className="text-[11px] text-[rgba(59,73,83,0.45)] flex items-center gap-1">
          <BiInfoCircle className="text-[12px] text-[#90AB8B]" />
          {helper}
        </p>
      )}
      {error && (
        <p className="text-[11.5px] text-red-500 flex items-center gap-1">
          <span className="text-[10px]">●</span> {error}
        </p>
      )}
    </div>
  );
}

export default FieldWrapper;
