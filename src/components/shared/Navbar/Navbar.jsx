"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { BiHome, BiCalendarCheck, BiCog, BiGrid } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import LogoMark from "../../ui/LogoMark";
import MobileNav from "./MobileNav";

import { UserInfoContext } from "@/context/UserInfoContext";
import ProfileDropdown from "./ProfileDropdown";

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

function Spinner() {
  return (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#90AB8B] border-t-transparent" />
  );
}

/* ═══════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { userInfo, isPending } = useContext(UserInfoContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <>
      <header
        className={[
          "sticky top-0 left-0 right-0 z-50",
          "bg-[rgba(59,73,83,0.72)] backdrop-blur-xl saturate-150",
          "border-b border-[rgba(144,171,139,0.18)]",
          "shadow-[0_4px_24px_rgba(59,73,83,0.18)]",
          "transition-[transform,opacity] duration-300 ease-in-out",
          scrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
        ].join(" ")}
      >
        <div className="max-w-350 mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            {/* ── LEFT: Logo + Auth (tablet) ── */}
            <div className="flex items-center gap-4">
              {/* Logo: centered on mobile, left on sm+ */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 no-underline"
              >
                <LogoMark />
              </Link>

              {/* Auth area — visible on sm→lg (tablet), hidden on lg+ (moved to right) */}
              <div className="hidden sm:flex lg:hidden items-center gap-3">
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Spinner />
                    <span className="text-[13px] font-medium text-[#90AB8B]">
                      Loading…
                    </span>
                  </div>
                ) : userInfo ? (
                  <ProfileDropdown />
                ) : (
                  <Link
                    href="/signin"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg no-underline bg-[#5A7863] hover:bg-[#4d6b56] text-[#EBF4DD] text-[13px] font-medium tracking-wide shadow-[0_2px_8px_rgba(90,120,99,0.25)] transition-colors duration-200"
                  >
                    <IoLogInOutline className="text-base" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>

            {/* ── CENTER/RIGHT: Nav links — hidden on mobile, visible sm+ ── */}
            <nav className="hidden sm:flex items-center gap-0.5">
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

            {/* ── RIGHT: Auth — desktop only (lg+) ── */}
            <div className="hidden lg:flex items-center gap-3">
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-[13px] font-medium text-[#90AB8B]">
                    Loading…
                  </span>
                </div>
              ) : userInfo ? (
                <ProfileDropdown />
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg no-underline bg-[#5A7863] hover:bg-[#4d6b56] text-[#EBF4DD] text-[13px] font-medium tracking-wide shadow-[0_2px_8px_rgba(90,120,99,0.25)] transition-colors duration-200"
                >
                  <IoLogInOutline className="text-base" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <MobileNav pathname={pathname} userInfo={userInfo} />
    </>
  );
}
