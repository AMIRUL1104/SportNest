// app/my-bookings/page.jsx
// Server Component

import BookingList from "@/components/booking/Bookinglist";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/backend/Booking/bookingData";

import { headers } from "next/headers";

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="text-muted-foreground">
          You must be logged in to view your bookings.
        </p>
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
