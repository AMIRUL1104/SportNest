import { BiMap } from "react-icons/bi";

function LivePreview() {
  /* live mini-preview data */
  const previewName = watch("name") || "Facility Name";
  const previewLocation = watch("location") || "Location";
  const previewType = watch("type") || "Type";
  const previewPrice = watch("price") || "—";

  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[rgba(144,171,139,0.15)]">
        <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase">
          Live Preview
        </h3>
      </div>

      <div className="px-5 py-4 flex flex-col gap-2">
        <h4 className="text-[14px] font-semibold text-[#3B4953] leading-snug">
          {previewName}
        </h4>
        <div className="flex items-center gap-1.5 text-[12px] text-[rgba(59,73,83,0.55)]">
          <BiMap className="text-[#90AB8B] text-[13px]" />
          {previewLocation}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[13px] font-semibold text-[#5A7863]">
            {previewPrice && previewPrice !== "—"
              ? `৳${previewPrice}/hr`
              : "Price TBD"}
          </span>
          {selectedSlots.length > 0 && (
            <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(144,171,139,0.15)] text-[#5A7863] border border-[rgba(144,171,139,0.25)]">
              {selectedSlots.length} slots
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LivePreview;
