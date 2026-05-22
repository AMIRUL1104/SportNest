// _components/BookingForm.jsx
// Client Component — Only this is a Client Component

"use client";

import { useForm, Controller } from "react-hook-form";
import { FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";

export default function BookingForm({ facility, AddBooking }) {
  const { name, price, slots = [] } = facility;
  const [totalPrice, setTotalPrice] = useState(price);
  const { userInfo, isPending } = useContext(UserInfoContext);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facilityName: name,
      bookingDate: "",
      timeSlot: "",
      hours: 1,
    },
  });

  const hours = watch("hours");

  // Auto-calculate price
  const handleHoursChange = (value) => {
    const numHours = parseInt(value) || 1;
    setTotalPrice(numHours * price);
  };

  const onSubmit = (data) => {
    const bookingData = {
      facilityId: facility._id || facility.id,
      facilityName: name,
      facilityImage: facility.imageUrl,
      userEmail: userInfo.email,
      bookingDate: data.bookingDate,
      timeSlot: data.timeSlot,
      hours: data.hours,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    };
    AddBooking(bookingData);

    // No API call, just logging form data
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 animate__animated animate__fadeIn"
    >
      {/* Facility Name — Read Only */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground">Facility</label>
        <input
          type="text"
          value={name}
          readOnly
          className="w-full rounded-lg border border-border/60 bg-muted/50 px-3 py-2.5 text-sm text-foreground outline-none"
        />
      </div>

      {/* Booking Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground">
          Booking Date
        </label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-3 text-sm text-muted-foreground pointer-events-none" />
          <Controller
            name="bookingDate"
            control={control}
            rules={{ required: "Please select a date" }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`w-full rounded-lg border px-3 py-2.5 pl-10 text-sm outline-none transition ${
                  errors.bookingDate
                    ? "border-red-500 bg-red-50/10"
                    : "border-border/60 bg-background hover:border-border"
                }`}
              />
            )}
          />
        </div>
        {errors.bookingDate && (
          <span className="text-xs text-red-500">
            {errors.bookingDate.message}
          </span>
        )}
      </div>

      {/* Time Slot Select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground">Time Slot</label>
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-sm text-muted-foreground pointer-events-none" />
          <Controller
            name="timeSlot"
            control={control}
            rules={{ required: "Please select a time slot" }}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full rounded-lg border px-3 py-2.5 pl-10 text-sm outline-none transition appearance-none bg-background ${
                  errors.timeSlot
                    ? "border-red-500 bg-red-50/10"
                    : "border-border/60 hover:border-border"
                }`}
              >
                <option value="">Choose a slot</option>
                {slots.length > 0 ? (
                  slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))
                ) : (
                  <option disabled>No slots available</option>
                )}
              </select>
            )}
          />
        </div>
        {errors.timeSlot && (
          <span className="text-xs text-red-500">
            {errors.timeSlot.message}
          </span>
        )}
      </div>

      {/* Hours Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground">Hours</label>
        <Controller
          name="hours"
          control={control}
          rules={{
            required: "Hours required",
            min: { value: 1, message: "Minimum 1 hour" },
            max: { value: 8, message: "Maximum 8 hours" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              min="1"
              max="8"
              onChange={(e) => {
                field.onChange(e);
                handleHoursChange(e.target.value);
              }}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                errors.hours
                  ? "border-red-500 bg-red-50/10"
                  : "border-border/60 bg-background hover:border-border"
              }`}
            />
          )}
        />
        {errors.hours && (
          <span className="text-xs text-red-500">{errors.hours.message}</span>
        )}
      </div>

      {/* Total Price Display */}
      {totalPrice > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3 border border-primary/10">
          <div className="flex items-center gap-2">
            <FaTicketAlt className="text-primary text-sm" />
            <span className="text-xs text-muted-foreground">Total Price</span>
          </div>
          <span className="text-lg font-bold text-primary">
            ৳{totalPrice.toLocaleString()}
          </span>
        </div>
      )}

      {/* Book Now Button */}
      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:bg-primary/90 active:scale-95 mt-2"
      >
        Book Now
      </button>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground">
        You will receive a confirmation email shortly after booking.
      </p>
    </form>
  );
}
