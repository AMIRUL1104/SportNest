// _components/BookingCard.jsx
// Server Component

import Image from "next/image";
import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";
import StatusBadge from "./Statusbadge";
import DeleteBookingButton from "./Deletebookingbutton";
import { DeleteBooking } from "@/lib/backend/Booking/bookingAction";

export default function BookingCard({ booking, index }) {
  const {
    _id,
    id,
    facilityName,
    facilityImage,
    bookingDate,
    timeSlot,
    totalPrice,
    status,
  } = booking;
  console.log(booking);

  return (
    <div
      className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:shadow-md animate__animated animate__fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image & Basic Info */}
      <div className="flex gap-4 mb-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={
              facilityImage ||
              "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=100&q=80"
            }
            alt={facilityName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {facilityName}
          </h3>
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 text-sm">
          <FaCalendarAlt className="text-xs text-muted-foreground" />
          <span className="text-muted-foreground">
            {new Date(bookingDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaClock className="text-xs text-muted-foreground" />
          <span className="text-muted-foreground">{timeSlot}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FaTag className="text-xs text-primary" />
          <span className="text-primary">৳{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <DeleteBookingButton bookingId={_id} DeleteBooking={DeleteBooking} />
      </div>
    </div>
  );
}
