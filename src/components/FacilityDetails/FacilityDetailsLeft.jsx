import {
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineMail,
} from "react-icons/hi";
import { TbCoinTaka } from "react-icons/tb";
import { Chip } from "@heroui/react";
import Image from "next/image";

export default function FacilityDetailsLeft({ facility }) {
  return (
    <div className="space-y-6">
      {/* 1. Hero Image Area */}
      <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden rounded-2xl shadow-sm border border-slate-100 bg-white p-2 animate__animated animate__fadeIn">
        <Image
          src={facility.imageUrl}
          alt={facility.name}
          fill
          priority
          className="object-cover rounded-xl hover:scale-[1.01] transition-transform duration-300"
        />
      </div>

      {/* 2. Facility Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full w-max mb-3 inline-block">
          {facility.type}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-4">
          {facility.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-xl text-slate-400 shrink-0" />
            <span>{facility.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup className="text-xl text-slate-400 shrink-0" />
            <span>Capacity: {facility.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbCoinTaka className="text-xl text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              {facility.price} TK / hour
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineMail className="text-xl text-slate-400 shrink-0" />
            <span className="truncate">{facility.ownerEmail}</span>
          </div>
        </div>
      </div>

      {/* 3. Available Slots Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <HiOutlineClock className="text-xl text-primary" /> Available Slots
        </h3>
        <div className="flex flex-wrap gap-2">
          {facility.slots &&
            facility.slots.map((slot, index) => (
              <Chip
                key={index}
                variant="flat"
                color="secondary"
                className="font-medium px-2 py-1 text-xs"
              >
                {slot}
              </Chip>
            ))}
        </div>
      </div>

      {/* 4. About This Facility */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-3">
          About This Facility
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {facility.description}
        </p>
      </div>

      {/* 5. Extra UX Improvements (Trust Building & Tips) */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 rounded-xl p-4 flex gap-3 items-start">
        <div className="bg-blue-500 text-white p-2 rounded-lg text-sm shrink-0 mt-0.5">
          💡
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-900">
            Quick Booking Tip
          </h4>
          <p className="text-xs text-blue-700/90 mt-0.5 leading-relaxed">
            Peak hours (4 PM - 6 PM) fill up fast! Book at least 24 hours in
            advance to secure your preferred slot.
          </p>
        </div>
      </div>
    </div>
  );
}
