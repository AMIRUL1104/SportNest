import { FaCalendarCheck, FaClock, FaLock } from "react-icons/fa";

function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBg,
  accentBg,
}) {
  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <span
        className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentBg}`}
      />
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
      >
        <Icon className={`text-xl ${iconColor}`} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
export default FeatureCard;
