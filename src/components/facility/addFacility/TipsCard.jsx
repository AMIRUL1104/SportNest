import { BiCheckCircle } from "react-icons/bi";
const TIPS = [
  "Use a high-quality image URL for better visibility",
  "Set a competitive price to attract more bookings",
  "Add all available time slots for maximum flexibility",
  "Write a clear description of your facility's features",
  "Double-check your location for accurate listings",
];
function TipsCard() {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-5">
      <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase mb-4">
        Facility Tips
      </h3>
      <ul className="flex flex-col gap-3">
        {TIPS.map((tip, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[rgba(90,120,99,0.15)] flex items-center justify-center shrink-0 mt-[1px]">
              <BiCheckCircle className="text-[10px] text-[#5A7863]" />
            </div>
            <span className="text-[12px] text-[rgba(59,73,83,0.65)] leading-relaxed">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipsCard;
