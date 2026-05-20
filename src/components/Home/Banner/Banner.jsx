import Link from "next/link";
import Image from "next/image";

import { BiCalendarCheck, BiChevronRight } from "react-icons/bi";
import "animate.css";

/* ═══════════════════════════════════════════
   BANNER / HERO  — Server Component
═══════════════════════════════════════════ */
function Banner() {
  return (
    <section className="relative min-h-[88vh] bg-[#EBF4DD] overflow-hidden flex items-center w-full animate__animated animate__fadeIn">
      {/* ════ background texture layer ════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* large soft blob — top left */}
        <div className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full bg-[#5A7863] opacity-[0.08] blur-[80px] animate-[floatBlob_12s_ease-in-out_infinite]" />
        {/* small accent blob — bottom right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#90AB8B] opacity-[0.1] blur-[64px] animate-[floatBlob_15s_ease-in-out_infinite_2s]" />
        {/* diagonal rule */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_60px,rgba(90,120,99,0.018)_60px,rgba(90,120,99,0.018)_61px)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 py-16 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* ════ LEFT — copy ════ */}
          <div className="flex-1 flex flex-col items-start gap-6 lg:pr-8">
            {/* eyebrow chip */}
            <span
              className="
              inline-flex items-center gap-2
              rounded-full border border-[rgba(90,120,99,0.3)]
              bg-[rgba(90,120,99,0.1)] px-4 py-1.5
              text-[12px] font-semibold tracking-[0.08em] uppercase text-[#5A7863]
              animate-[fadeSlideUp_0.5s_ease_both]
            "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5A7863] animate-pulse" />
              Instant Sports Booking
            </span>

            {/* headline */}
            <h1
              className="
              text-[40px] sm:text-[52px] lg:text-[58px]
              font-black leading-[1.05] tracking-[-0.03em]
              text-[#3B4953]
              animate-[fadeSlideUp_0.6s_0.1s_ease_both_backwards]
            "
            >
              Play Any Sport,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#5A7863]">Book Any</span>
                {/* squiggle underline */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6 C30 2, 60 6, 90 4 S150 2, 198 5"
                    stroke="#90AB8B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <br className="hidden sm:block" />
              Facility
            </h1>

            {/* subtitle */}
            <p
              className="
              max-w-[480px] text-[15px] sm:text-[16px]
              leading-relaxed text-[rgba(59,73,83,0.65)]
              animate-[fadeSlideUp_0.6s_0.2s_ease_both_backwards]
            "
            >
              Book football turfs, badminton courts, swimming lanes and tennis
              courts — instantly. No calls, no waiting.
            </p>

            {/* CTA row */}
            <div
              className="
              flex flex-col sm:flex-row items-start sm:items-center gap-3
              animate-[fadeSlideUp_0.6s_0.3s_ease_both_backwards]
            "
            >
              <Link
                href="/facilities"
                className="
                  group flex items-center gap-2
                  rounded-xl bg-[#3B4953] px-6 py-3.5
                  text-[14px] font-bold text-[#EBF4DD] no-underline
                  shadow-[0_4px_20px_rgba(59,73,83,0.28)]
                  transition-all duration-300 ease-out
                  hover:bg-[#5A7863] hover:shadow-[0_12px_32px_rgba(90,120,99,0.4)]
                  hover:-translate-y-1 hover:scale-[1.03]
                  active:translate-y-0 active:scale-[0.98]
                "
              >
                <BiCalendarCheck className="text-[18px]" />
                Explore Facilities
                <BiChevronRight
                  className="
                  text-[16px] text-[rgba(235,244,221,0.6)]
                  transition-all duration-300 group-hover:translate-x-1 group-hover:text-[rgba(235,244,221,0.9)]
                "
                />
              </Link>

              <Link
                href="/register"
                className="
                  flex items-center gap-1.5 px-5 py-3.5
                  text-[13.5px] font-semibold text-[rgba(59,73,83,0.65)]
                  no-underline transition-all duration-300 ease-out
                  hover:text-[#3B4953] hover:scale-[1.02] hover:-translate-y-0.5
                  active:scale-[0.98]
                "
              >
                Get started free
                <BiChevronRight className="text-[15px]" />
              </Link>
            </div>

            {/* trust row */}
            <div
              className="
              flex items-center gap-5 pt-2
              animate-[fadeSlideUp_0.6s_0.4s_ease_both_backwards]
            "
            >
              {[
                { value: "500+", label: "Facilities" },
                { value: "12k+", label: "Bookings" },
                { value: "4.9★", label: "Rating" },
              ].map(({ value, label }, index) => (
                <div
                  key={label}
                  className="flex flex-col animate-[staggerFadeIn_0.5s_ease_both_backwards]"
                  style={{
                    animationDelay: `${0.4 + index * 0.1}s`,
                  }}
                >
                  <span className="text-[18px] font-black text-[#3B4953] leading-none">
                    {value}
                  </span>
                  <span className="text-[11px] text-[rgba(59,73,83,0.5)] font-medium mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
              <div className="w-px h-8 bg-[rgba(144,171,139,0.3)]" />
              <p className="text-[11.5px] text-[rgba(59,73,83,0.45)] max-w-[120px] leading-snug animate-[staggerFadeIn_0.5s_ease_both_backwards] duration-700">
                Trusted by players across Bangladesh
              </p>
            </div>
          </div>

          {/* ════ RIGHT — image collage ════ */}
          <div
            className="
            relative w-full max-w-[500px] lg:max-w-none lg:w-[480px]
            flex-shrink-0
            animate-[fadeSlideUp_0.7s_0.15s_ease_both_backwards]
          "
          >
            {/* collage grid */}
            <div className="relative w-full aspect-square">
              {/* ── decorative ring ── */}
              <div
                className="
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[88%] h-[88%] rounded-full
                border-[1.5px] border-dashed border-[rgba(144,171,139,0.3)]
                animate-[spin_30s_linear_infinite]
              "
              />

              {/* ── large card — football (top left) ── */}
              <div
                className="
                absolute top-0 left-0
                w-[56%] h-[56%]
                rounded-[20px] overflow-hidden
                shadow-[0_8px_32px_rgba(59,73,83,0.18)]
                border-2 border-white
                transition-all duration-500 ease-out
                hover:shadow-[0_16px_48px_rgba(59,73,83,0.25)]
                hover:-translate-y-1.5 hover:scale-[1.02]
                animate-[floatCard_6s_ease-in-out_infinite]
              "
              >
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUw-1fCEtZ9JUTC1v26gG_PgFTEGec4eVQw&s"
                  }
                  alt="Football turf"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B4953]/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white tracking-wide uppercase">
                  Football
                </span>
              </div>

              {/* ── tall card — cricket (top right) ── */}
              <div
                className="
                absolute top-0 right-0
                w-[40%] h-[70%]
                rounded-[20px] overflow-hidden
                shadow-[0_8px_32px_rgba(59,73,83,0.15)]
                border-2 border-white
                transition-all duration-500 ease-out
                hover:shadow-[0_16px_48px_rgba(59,73,83,0.25)]
                hover:-translate-y-1.5 hover:scale-[1.02]
                animate-[floatCard_7s_ease-in-out_infinite_1s]
              "
              >
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwIECZeCwAVFr2qBIE3tD9yYZU8NlOjlb8SQ&s"
                  }
                  alt="Cricket ground"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B4953]/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white tracking-wide uppercase">
                  Cricket
                </span>
              </div>

              {/* ── wide card — badminton (bottom left) ── */}
              <div
                className="
                absolute bottom-0 left-0
                w-[40%] h-[40%]
                rounded-[20px] overflow-hidden
                shadow-[0_8px_32px_rgba(59,73,83,0.15)]
                border-2 border-white
                transition-all duration-500 ease-out
                hover:shadow-[0_16px_48px_rgba(59,73,83,0.25)]
                hover:-translate-y-1.5 hover:scale-[1.02]
                animate-[floatCard_5.5s_ease-in-out_infinite_0.5s]
              "
              >
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogFxokY9-v19o5ZSC_E-KQ6TCVKU0ygFjeQ&s"
                  }
                  alt="Badminton court"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B4953]/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white tracking-wide uppercase">
                  Badminton
                </span>
              </div>

              {/* ── square card — volleyball (bottom right) ── */}
              <div
                className="
                absolute bottom-0 right-0
                w-[56%] h-[44%]
                rounded-[20px] overflow-hidden
                shadow-[0_8px_32px_rgba(59,73,83,0.15)]
                border-2 border-white
                transition-all duration-500 ease-out
                hover:shadow-[0_16px_48px_rgba(59,73,83,0.25)]
                hover:-translate-y-1.5 hover:scale-[1.02]
                animate-[floatCard_6.5s_ease-in-out_infinite_1.5s]
              "
              >
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThzAcLI5BLrI2LWKvqP7iJ1K52PL5z7s0psA&s"
                  }
                  alt="Volleyball court"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B4953]/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white tracking-wide uppercase">
                  Volleyball
                </span>
              </div>

              {/* ── floating badge — centre ── */}
              <div
                className="
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                flex flex-col items-center justify-center
                w-[80px] h-[80px] rounded-full
                bg-[#5A7863] border-4 border-white
                shadow-[0_8px_24px_rgba(90,120,99,0.35)]
                z-10
                animate-[floatBadge_4s_ease-in-out_infinite]
              "
              >
                <span className="text-[22px] font-black text-[#EBF4DD] leading-none">
                  8+
                </span>
                <span className="text-[9px] font-semibold text-[rgba(235,244,221,0.8)] tracking-wide uppercase mt-0.5">
                  Sports
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ CSS animations ════ */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-12px, -8px); }
          66% { transform: translate(8px, 12px); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes floatBadge {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }

        @keyframes staggerFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Banner;
