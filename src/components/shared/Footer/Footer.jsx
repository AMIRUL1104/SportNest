import LogoMark from "@/components/ui/LogoMark";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/SocialSVGicons";
import Link from "next/link";
import {
  BiHome,
  BiBuildings,
  BiCalendarCheck,
  BiCog,
  BiEnvelope,
  BiPhone,
  BiMap,
} from "react-icons/bi";

/* ── Quick links ── */
const quickLinks = [
  { href: "/", label: "Home", icon: BiHome },
  { href: "/facilities", label: "Facilities", icon: BiBuildings },
  { href: "/my-bookings", label: "Bookings", icon: BiCalendarCheck },
  {
    href: "/facilities/manage-my-facilities",
    label: "Manage Facility",
    icon: BiCog,
  },
];

/* ── Contact info ── */
const contactItems = [
  {
    icon: BiEnvelope,
    text: "hello@sportnest.com",
    href: "mailto:hello@sportnest.com",
  },
  { icon: BiPhone, text: "+880 1700-000000", href: "tel:+8801700000000" },
  { icon: BiMap, text: "Sylhet, Bangladesh", href: null },
];

/* ════════════════════════════════════════
   FOOTER  — Server Component
════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="bg-[#3B4953] border-t border-[rgba(144,171,139,0.15)]">
      {/* ── Main grid ── */}
      <div className="max-w-350 mx-auto px-5 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ════ Column 1 — Brand ════ */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="no-underline w-fit">
              <LogoMark />
            </Link>
            <p className="text-[rgba(235,244,221,0.6)] text-sm leading-relaxed max-w-55">
              Book premium sports facilities instantly. Fair pricing, zero
              hassle — just play.
            </p>
          </div>

          {/* ════ Column 2 — Quick Links ════ */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#EBF4DD] text-[13px] font-semibold tracking-[0.08em] uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="
                      flex items-center gap-2 no-underline
                      text-[rgba(235,244,221,0.6)] text-[13.5px]
                      hover:text-[#90AB8B] transition-colors duration-200 w-fit
                    "
                  >
                    <Icon className="text-[15px] shrink-0 text-[#5A7863]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ════ Column 3 — Contact ════ */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#EBF4DD] text-[13px] font-semibold tracking-[0.08em] uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {contactItems.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className="
                        flex items-start gap-2 no-underline
                        text-[rgba(235,244,221,0.6)] text-[13.5px]
                        hover:text-[#90AB8B] transition-colors duration-200 w-fit
                      "
                    >
                      <Icon className="text-[16px] shrink-0 text-[#5A7863] mt-2px" />
                      {text}
                    </a>
                  ) : (
                    <span className="flex items-start gap-2 text-[rgba(235,244,221,0.6)] text-[13.5px]">
                      <Icon className="text-[16px] shrink-0 text-[#5A7863] mt-px" />
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ════ Column 4 — Social ════ */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#EBF4DD] text-[13px] font-semibold tracking-[0.08em] uppercase">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  w-9 h-9 rounded-lg flex items-center justify-center
                  bg-[rgba(144,171,139,0.1)] border border-[rgba(144,171,139,0.18)]
                  text-[rgba(235,244,221,0.6)]
                  hover:bg-[rgba(90,120,99,0.3)] hover:text-[#EBF4DD]
                  hover:border-[rgba(144,171,139,0.4)]
                  transition-all duration-200
                "
              >
                <FacebookIcon />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  w-9 h-9 rounded-lg flex items-center justify-center
                  bg-[rgba(144,171,139,0.1)] border border-[rgba(144,171,139,0.18)]
                  text-[rgba(235,244,221,0.6)]
                  hover:bg-[rgba(90,120,99,0.3)] hover:text-[#EBF4DD]
                  hover:border-[rgba(144,171,139,0.4)]
                  transition-all duration-200
                "
              >
                <InstagramIcon />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="
                  w-9 h-9 rounded-lg flex items-center justify-center
                  bg-[rgba(144,171,139,0.1)] border border-[rgba(144,171,139,0.18)]
                  text-[rgba(235,244,221,0.6)]
                  hover:bg-[rgba(90,120,99,0.3)] hover:text-[#EBF4DD]
                  hover:border-[rgba(144,171,139,0.4)]
                  transition-all duration-200
                "
              >
                <XIcon />
              </a>
            </div>

            <p className="text-[rgba(235,244,221,0.4)] text-[12px] leading-relaxed max-w-45">
              Stay updated with new courts, offers & sports events.
            </p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-350 mx-auto px-5">
        <div className="border-t border-[rgba(144,171,139,0.12)]" />
      </div>

      {/* ── Copyright bar ── */}
      <div className="max-w-350 mx-auto px-5 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[rgba(235,244,221,0.38)] text-[12px] tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} SportNest. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-[rgba(235,244,221,0.38)] text-[12px] no-underline hover:text-[#90AB8B] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-[rgba(144,171,139,0.3)] text-[10px]">•</span>
            <Link
              href="/terms"
              className="text-[rgba(235,244,221,0.38)] text-[12px] no-underline hover:text-[#90AB8B] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
