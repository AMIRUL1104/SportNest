function FieldCheckList({ selectedSlots, watch }) {
  return (
    <div className="bg-[rgba(235,244,221,0.6)] rounded-2xl border border-[rgba(144,171,139,0.2)] p-5">
      <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase mb-3">
        Required Fields
      </h3>
      <ul className="flex flex-col gap-2">
        {[
          ["Facility Name", !!watch("name")],
          ["Facility Type", !!watch("type")],
          ["Location", !!watch("location")],
          ["Image URL", !!watch("imageUrl")],
          ["Price / Hour", !!watch("price")],
          ["Capacity", !!watch("capacity")],
          ["Time Slots", selectedSlots.length > 0],
          ["Description", !!watch("description")],
        ].map(([label, done]) => (
          <li key={label} className="flex items-center gap-2">
            <div
              className={`
                      w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      transition-all duration-200
                      ${
                        done
                          ? "bg-[#5A7863]"
                          : "bg-[rgba(144,171,139,0.2)] border border-[rgba(144,171,139,0.4)]"
                      }
                    `}
            >
              {done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4l2 2 3-3"
                    stroke="#EBF4DD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-[12px] transition-colors duration-200 ${done ? "text-[#3B4953] font-medium" : "text-[rgba(59,73,83,0.5)]"}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldCheckList;
