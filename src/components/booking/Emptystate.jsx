// _components/EmptyState.jsx
// Server Component

import { FaCalendarTimes } from "react-icons/fa";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 py-16 px-4 text-center animate__animated animate__fadeIn">
      <FaCalendarTimes className="mb-4 text-5xl text-muted-foreground/30" />
      <h2 className="mb-2 text-lg font-semibold text-foreground">
        No bookings yet
      </h2>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        You have not made any bookings yet. Explore sports facilities and book
        your first session today!
      </p>
      <Link
        href="/facilities"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md active:scale-95"
      >
        Explore Facilities
      </Link>
    </div>
  );
}
