"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiUserCircle,
  BiHome,
  BiBuildings,
  BiCalendarCheck,
  BiCog,
  BiGrid,
} from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import LogoMark from "../../ui/LogoMark";
import MobileNav from "./MobileNav";
// import {  } from "react-icons/lu";

/* ─── auth hook placeholder ─── */
const useMockAuth = () => ({
  isPending: false,
  userInfo: null,
});

const mainLinks = [
  { href: "/", label: "Home", icon: BiHome },
  { href: "/facilities", label: "Facilities", icon: BiGrid },
  { href: "/my-bookings", label: "Bookings", icon: BiCalendarCheck },
  {
    href: "/facilities/manage-my-facilities",
    label: "Manage Facilities",
    icon: BiCog,
  },
];

/* ─── Spinner ─── */
function Spinner() {
  // return <LuLoader2 className="animate-spin text-[#90AB8B] text-lg" />;

  <div className="animate-spin text-[#90AB8B] text-lg">Loading...</div>;
}

/* ═══════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { isPending, userInfo } = useMockAuth();
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* ════════ DESKTOP / TABLET HEADER ════════ */}
      <header
        className={[
          /* position & stack */
          "fixed top-0 left-0 right-0 z-50",
          /* glassmorphism */
          "bg-[rgba(59,73,83,0.72)] backdrop-blur-xl saturate-150",
          "border-b border-[rgba(144,171,139,0.18)]",
          "shadow-[0_4px_24px_rgba(59,73,83,0.18)]",
          /* scroll-hide */
          "transition-[transform,opacity] duration-300 ease-in-out",
          scrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
        ].join(" ")}
      >
        <div className="max-w-350 mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo: centred on mobile, left on lg ── */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 no-underline"
            >
              <LogoMark />
            </Link>

            {/* ── Desktop nav (hidden below lg) ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {mainLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg",
                      "text-[13.5px] font-medium tracking-wide no-underline",
                      "transition-all duration-200",
                      active
                        ? "text-[#EBF4DD] bg-[rgba(144,171,139,0.18)]"
                        : "text-[rgba(235,244,221,0.72)] hover:text-[#EBF4DD] hover:bg-[rgba(144,171,139,0.1)]",
                    ].join(" ")}
                  >
                    <Icon className="text-base shrink-0" />
                    <span>{label}</span>

                    {/* active underline */}
                    <span
                      className={[
                        "absolute bottom-1 left-3.5 right-3.5 h-px rounded-full",
                        "bg-[#90AB8B] origin-left transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Auth area (hidden on xs, visible sm+) ── */}
            <div className="hidden sm:flex items-center gap-3">
              {!mounted ? (
                /* hydration placeholder — prevents layout shift */
                <div className="w-26" />
              ) : isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-[13px] font-medium text-[#90AB8B]">
                    Loading…
                  </span>
                </div>
              ) : userInfo ? (
                /* ── Logged-in state ── */
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/profile"
                    className="text-[rgba(235,244,221,0.85)] hover:text-[#EBF4DD] transition-colors duration-200"
                  >
                    <BiUserCircle className="text-[26px]" />
                  </Link>

                  <button
                    className="
                      px-3.5 py-1.5 rounded-[7px] text-[13px] font-medium tracking-wide
                      border border-[rgba(239,68,68,0.45)] text-[#fca5a5] bg-transparent
                      hover:bg-[rgba(239,68,68,0.12)] hover:border-[rgba(239,68,68,0.7)]
                      transition-all duration-200 cursor-pointer
                    "
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                /* ── Logged-out state ── */
                <Link
                  href="/signin"
                  className="
                    flex items-center gap-1.5 px-4 py-1.75 rounded-lg no-underline
                    bg-[#5A7863] hover:bg-[#4d6b56] text-[#EBF4DD]
                    text-[13px] font-medium tracking-wide
                    shadow-[0_2px_8px_rgba(90,120,99,0.25)]
                    transition-colors duration-200
                  "
                >
                  <IoLogInOutline className="text-base" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ════════ MOBILE BOTTOM NAV ════════ */}
      <MobileNav pathname={pathname} userInfo={userInfo} />
    </>
  );
}
