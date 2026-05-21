import { Card } from "@heroui/react";
import BookingForm from "./BookingForm";

export default function FacilityDetailsRight({ facility }) {
  return (
    <Card
      className="border-none shadow-md animate__animated animate__fadeInUp bg-white"
      radius="lg"
    >
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 animate__animated animate__fadeInUp">
        {/* Heading & Helper text */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Reserve Your Spot
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fast, secure, and instant conversion booking experience.
          </p>
        </div>

        {/* Client Side Booking Form */}
        <BookingForm facility={facility} />
      </div>
    </Card>
  );
}
