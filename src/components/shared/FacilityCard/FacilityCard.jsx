"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BiMap,
  BiGroup,
  BiTime,
  BiTrash,
  BiEdit,
  BiCalendarCheck,
  BiStar,
} from "react-icons/bi";
import DeleteFacilityButton from "./DeleteFacility";

/* ─────────────────────────────────────────
   Type badge color map
───────────────────────────────────────── */
const TYPE_COLORS = {
  Football: "bg-[rgba(90,120,99,0.85)]",
  Badminton: "bg-[rgba(59,73,83,0.85)]",
  Tennis: "bg-[rgba(144,171,139,0.85)]",
  Swimming: "bg-[rgba(59,73,83,0.85)]",
  Basketball: "bg-[rgba(90,120,99,0.85)]",
  Cricket: "bg-[rgba(144,171,139,0.85)]",
};

/* ═══════════════════════════════════════════
   FACILITY CARD
═══════════════════════════════════════════ */
export default function FacilityCard({
  facility,
  variant = "browse", // "featured" | "browse" | "manage"
  DeleteFacility,
}) {
  const [imgError, setImgError] = useState(false);

  const {
    _id,
    name,
    type,
    location,
    imageUrl,
    price,
    capacity,
    bookingCount = 0,
    rating,
  } = facility;

  const badgeColor = TYPE_COLORS[type] ?? "bg-[rgba(59,73,83,0.85)]";

  return (
    <article
      className="
      group flex flex-col h-full
      bg-white rounded-2xl overflow-hidden
      border border-[rgba(144,171,139,0.2)]
      shadow-[0_2px_16px_rgba(59,73,83,0.07)]
      hover:shadow-[0_8px_32px_rgba(59,73,83,0.14)]
      hover:-translate-y-0.5
      transition-all duration-300
    "
    >
      {/* ── Image section ── */}
      <div className="relative w-full h-48 shrink-0 overflow-hidden bg-[#EBF4DD]">
        {!imgError ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BiCalendarCheck className="text-[40px] text-[rgba(144,171,139,0.4)]" />
          </div>
        )}

        {/* dim overlay on hover */}
        <div className="absolute inset-0 bg-[#3B4953] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        {/* type badge */}
        <span
          className={`
          absolute top-3 left-3
          text-[11px] font-semibold text-white tracking-wide
          px-2.5 py-1 rounded-full backdrop-blur-sm
          ${badgeColor}
        `}
        >
          {type}
        </span>

        {/* rating badge (featured only) */}
        {variant === "featured" && rating && (
          <span
            className="
            absolute top-3 right-3
            flex items-center gap-1
            text-[11px] font-semibold text-[#3B4953]
            bg-white/90 backdrop-blur-sm
            px-2 py-1 rounded-full
          "
          >
            <BiStar className="text-[#F59E0B] text-[12px]" />
            {rating}
          </span>
        )}

        {/* manage: booking count pill on image */}
        {variant === "manage" && (
          <span
            className="
            absolute top-3 right-3
            flex items-center gap-1
            text-[11px] font-semibold text-[#EBF4DD]
            bg-[rgba(59,73,83,0.82)] backdrop-blur-sm
            px-2.5 py-1 rounded-full
          "
          >
            <BiCalendarCheck className="text-[12px]" />
            {bookingCount} bookings
          </span>
        )}
      </div>

      {/* ── Content section ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* title */}
        <h3
          className="
          text-[15px] font-semibold text-[#3B4953] leading-snug
          line-clamp-2 mb-1
        "
        >
          {name}
        </h3>

        {/* location */}
        <div className="flex items-center gap-1.5 text-[12.5px] text-[rgba(59,73,83,0.55)] mb-3">
          <BiMap className="text-[#90AB8B] text-[14px] shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* stats row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-[12px] text-[rgba(59,73,83,0.6)]">
            <BiGroup className="text-[#90AB8B] text-[14px]" />
            <span>{capacity} players</span>
          </div>
          <div className="w-px h-3 bg-[rgba(144,171,139,0.3)]" />
          <div className="flex items-center gap-1.5 text-[12px] text-[rgba(59,73,83,0.6)]">
            <BiTime className="text-[#90AB8B] text-[14px]" />
            <span>Per hour</span>
          </div>
        </div>

        {/* price + CTA — pushed to bottom */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(144,171,139,0.15)]">
          {/* price */}
          <div>
            <span className="text-[18px] font-bold text-[#3B4953]">
              ৳{price}
            </span>
            <span className="text-[11px] text-[rgba(59,73,83,0.45)] ml-1">
              /hr
            </span>
          </div>

          {/* ── Action area by variant ── facilities/manage-my-facilities*/}

          {/* featured / browse → single Book Now */}
          {(variant === "featured" || variant === "browse") && (
            <Link
              href={`/facilities/${_id}`}
              className="
                flex items-center gap-1.5
                px-4 py-2 rounded-xl
                bg-[#5A7863] hover:bg-[#4d6b56] active:scale-95
                text-[#EBF4DD] text-[12.5px] font-semibold
                no-underline transition-all duration-200
                shadow-[0_2px_8px_rgba(90,120,99,0.25)]
              "
            >
              <BiCalendarCheck className="text-[14px]" />
              Book Now
            </Link>
          )}

          {/* manage → Update + Delete */}
          {variant === "manage" && (
            <div className="flex items-center gap-2">
              <Link
                href={`/manage/facilities/${_id}/edit`}
                className="
                  flex items-center gap-1 px-3 py-1.5 rounded-lg
                  border border-[rgba(144,171,139,0.45)] bg-transparent
                  text-[#3B4953] text-[12px] font-medium
                  hover:bg-[rgba(235,244,221,0.7)] hover:border-[#5A7863]
                  no-underline transition-all duration-200
                "
              >
                <BiEdit className="text-[13px]" />
                Update
              </Link>
              <DeleteFacilityButton id={_id} DeleteFacility={DeleteFacility} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
