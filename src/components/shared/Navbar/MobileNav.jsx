import Link from "next/link";
import {
  BiCalendarCheck,
  BiCog,
  BiGrid,
  BiHome,
  BiUserCircle,
} from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";

/* ─────────────────────────────────────────
   Mobile bottom nav
───────────────────────────────────────── */
const mobileLinks = [
  { href: "/", label: "Home", icon: BiHome },
  { href: "/facilities", label: "Facilities", icon: BiGrid },
  { href: "/my-bookings", label: "Bookings", icon: BiCalendarCheck },
  { href: "/facilities/manage-my-facilities", label: "Manage", icon: BiCog },
];

export default function MobileNav({ pathname, userInfo }) {
  const isActive = (href) => pathname === href;

  const authLink = userInfo
    ? { href: "/profile", label: "Profile", icon: BiUserCircle }
    : { href: "/login", label: "Sign In", icon: IoLogInOutline };

  const links = [...mobileLinks, authLink];

  return (
    /* visible only below sm */
    <div className="block sm:hidden">
      <nav
        className="
          fixed bottom-4 left-4 right-4 z-50
          flex items-center justify-around
          px-1 py-2.5 rounded-[18px]
          bg-[rgba(59,73,83,0.78)] backdrop-blur-xl saturate-180
          border border-[rgba(144,171,139,0.2)]
          shadow-[0_8px_32px_rgba(59,73,83,0.28),0_1px_0_rgba(235,244,221,0.06)_inset]
        "
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl no-underline",
                "transition-colors duration-200",
                active ? "bg-[rgba(144,171,139,0.22)]" : "bg-transparent",
              ].join(" ")}
            >
              <Icon
                className={[
                  "text-[22px] transition-colors duration-200",
                  active ? "text-[#90AB8B]" : "text-[rgba(235,244,221,0.55)]",
                ].join(" ")}
              />
              <span
                className={[
                  "text-[10px] tracking-wide transition-colors duration-200",
                  active
                    ? "font-semibold text-[#EBF4DD]"
                    : "font-normal text-[rgba(235,244,221,0.45)]",
                ].join(" ")}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
