import { FaCalendarCheck, FaShieldAlt, FaClock, FaLock } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

const features = [
  {
    id: 1,
    icon: FaCalendarCheck,
    title: "Easy Booking",
    description:
      "Book your favorite sports facility quickly with a simple and smooth booking experience. No complicated process — just choose a slot and start playing.",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    accentBg: "bg-emerald-500",
  },
  {
    id: 2,
    icon: FaShieldAlt,
    title: "Verified Facilities",
    description:
      "Explore trusted and verified sports venues with quality environments, accurate details, and well-organised facilities you can rely on.",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50 dark:bg-sky-950/40",
    accentBg: "bg-sky-500",
  },
  {
    id: 3,
    icon: FaClock,
    title: "Flexible Schedule",
    description:
      "Choose time slots that match your schedule and enjoy sports without time pressure or complicated arrangements — on your terms.",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50 dark:bg-violet-950/40",
    accentBg: "bg-violet-500",
  },
  {
    id: 4,
    icon: FaLock,
    title: "Safe Experience",
    description:
      "Enjoy a secure and comfortable sports booking experience designed for players, teams, and communities — with privacy you can count on.",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    accentBg: "bg-amber-500",
  },
];

function WhyChooseSportNest() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Why SportNest
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight">
            Why Choose SportNest
          </h2>
          <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
            Discover a smarter way to book sports facilities — built for
            convenience, trust, and a seamless experience every time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSportNest;
