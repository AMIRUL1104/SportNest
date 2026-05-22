// _components/ProfileQuickActions.jsx
// Server Component

import Link from "next/link";
import { FaCalendarCheck, FaSearch, FaBuilding } from "react-icons/fa";
import LogoutButton from "./Logoutbutton";

const actions = [
  {
    label: "My Bookings",
    href: "/my-bookings",
    icon: FaCalendarCheck,
    description: "View your booking history",
  },
  {
    label: "Browse Facilities",
    href: "/facilities",
    icon: FaSearch,
    description: "Explore available sports facilities",
  },
  {
    label: "Manage Facilities",
    href: "/dashboard/facilities",
    icon: FaBuilding,
    description: "Add or update your facilities",
  },
];

export default function ProfileQuickActions() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-6 flex flex-col gap-4 animate__animated animate__fadeIn">
      <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>

      <div className="flex flex-col gap-2.5">
        {actions.map(({ label, href, icon: Icon, description }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3 transition-all hover:bg-muted/50 hover:border-border active:scale-[0.99] group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
              <Icon className="text-sm text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 pt-2">
        <LogoutButton />
      </div>
    </div>
  );
}
