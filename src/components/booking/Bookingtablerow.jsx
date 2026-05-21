// _components/BookingTableRow.jsx
// Server Component

import Image from "next/image";
import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";
import DeleteBookingButton from "./Deletebookingbutton";
import StatusBadge from "./Statusbadge";
import { DeleteBooking } from "@/lib/backend/Booking/bookingAction";

export default function BookingTableRow({ booking, index }) {
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

  return (
    <tr
      className="border-b border-border/60 transition-colors hover:bg-muted/30 animate__animated animate__fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Facility */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={facilityImage}
              alt={facilityName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <span className="text-sm font-medium text-foreground">
            {facilityName}
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FaCalendarAlt className="text-xs" />
          {new Date(bookingDate).toLocaleDateString()}
        </div>
      </td>

      {/* Slot */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FaClock className="text-xs" />
          {timeSlot}
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FaTag className="text-xs text-primary" />৳
          {totalPrice.toLocaleString()}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <DeleteBookingButton
          bookingId={_id || id}
          DeleteBooking={DeleteBooking}
        />
      </td>
    </tr>
  );
}
