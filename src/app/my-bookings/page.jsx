

import BookingList from "@/components/booking/Bookinglist";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/backend/Booking/bookingData";

import { headers } from "next/headers";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

export const metadata = {
  title: "My Bookings",
  description: "View and manage your sports facility bookings",
};

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userInfo = session?.user;
  const userEmail = userInfo?.email;

  if (!userEmail) {
    return (
      <div className="flex flex-col items-center justify-center space-y-5 min-h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You must be logged in to view your bookings.
        </p>
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
      </div>
    );
  }

  const bookings = await getMyBookings(userEmail);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Bookings
          </h1>
          <p className="text-base text-muted-foreground">
            View and manage all your sports facility bookings
          </p>
        </div>

        {/* Booking List */}
        <BookingList bookings={bookings} />
      </div>
    </main>
  );
}
