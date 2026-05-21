// _components/BookingList.jsx
// Server Component

import Image from "next/image";
import BookingCard from "./Bookingcard";
import EmptyState from "./Emptystate";
import BookingTableRow from "./Bookingtablerow";

export default function BookingList({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border/60 shadow-sm animate__animated animate__fadeIn">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/60 bg-muted/50">
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Facility
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Slot
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide text-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <BookingTableRow
                key={booking._id}
                booking={booking}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking._id || booking.id}
            booking={booking}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
