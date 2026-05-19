// // only visible for website admin
// //  only admin can add a new  facility

// function AddFacilityPage() {
//   return <div>AddFacilityPage</div>;
// }

// export default AddFacilityPage;

"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Fieldset } from "@heroui/react";
import {
  BiBuildings,
  BiMap,
  BiLink,
  BiDollar,
  BiGroup,
  BiText,
  BiEnvelope,
  BiChevronDown,
  BiCheckCircle,
  BiInfoCircle,
  BiImage,
} from "react-icons/bi";
import Image from "next/image";
// import { LuLoader2 } from "react-icons/lu";

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const FACILITY_TYPES = [
  "Football",
  "Badminton",
  "Tennis",
  "Swimming",
  "Basketball",
  "Cricket",
];

const TIME_SLOTS = [
  "6AM–7AM",
  "7AM–8AM",
  "8AM–9AM",
  "9AM–10AM",
  "10AM–11AM",
  "11AM–12PM",
  "12PM–1PM",
  "1PM–2PM",
  "2PM–3PM",
  "3PM–4PM",
  "4PM–5PM",
  "5PM–6PM",
  "6PM–7PM",
  "7PM–8PM",
  "8PM–9PM",
  "9PM–10PM",
];

const TIPS = [
  "Use a high-quality image URL for better visibility",
  "Set a competitive price to attract more bookings",
  "Add all available time slots for maximum flexibility",
  "Write a clear description of your facility's features",
  "Double-check your location for accurate listings",
];

/* ─────────────────────────────────────────
   Section heading component
───────────────────────────────────────── */
function SectionHeading({ number, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#5A7863] shrink-0">
        <span className="text-[11px] font-bold text-[#EBF4DD]">{number}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon className="text-[16px] text-[#5A7863]" />
        <h2 className="text-[14px] font-semibold text-[#3B4953] tracking-wide">
          {title}
        </h2>
      </div>
      <div className="flex-1 h-px bg-[rgba(144,171,139,0.25)]" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Field wrapper
───────────────────────────────────────── */
function FieldWrapper({ label, required, helper, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#3B4953] tracking-wide">
        {label}
        {required && <span className="text-[#5A7863] ml-0.5">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p className="text-[11px] text-[rgba(59,73,83,0.45)] flex items-center gap-1">
          <BiInfoCircle className="text-[12px] text-[#90AB8B]" />
          {helper}
        </p>
      )}
      {error && (
        <p className="text-[11.5px] text-red-500 flex items-center gap-1">
          <span className="text-[10px]">●</span> {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Input box
───────────────────────────────────────── */
function InputBox({ icon: Icon, error, children }) {
  return (
    <div
      className={`
      flex items-center gap-2.5 px-3.5 h-11 rounded-xl
      border transition-all duration-200
      ${
        error
          ? "border-red-400 bg-red-50/40"
          : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
      }
    `}
    >
      {Icon && <Icon className="text-[16px] text-[#90AB8B] shrink-0" />}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADD FACILITY PAGE
═══════════════════════════════════════════ */
export default function AddFacilityPage() {
  const [selectedSlots, setSelectedSlots] = useState([]);
  // const [imagePreview, setImagePreview] = useState("");
  const [slotsError, setSlotsError] = useState("");

  /* replace with actual logged-in user email */
  const ownerEmail = "owner@sportnest.com";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  /* live image preview */
  // const watchedImageUrl = watch("imageUrl");

  // const handleImageBlur = () => {
  //   setImagePreview(watch("imageUrl") || "");
  // };

  /* slot toggle */
  const toggleSlot = (slot) => {
    setSlotsError("");
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  /* submit */
  const onSubmit = async (data) => {
    if (selectedSlots.length === 0) {
      setSlotsError("Please select at least one time slot");
      return;
    }
    const payload = {
      ...data,
      slots: selectedSlots,
      ownerEmail,
      price: Number(data.price),
      capacity: Number(data.capacity),
    };
    console.log("📦 Add Facility payload →", payload);
    // await yourApiCall(payload);
  };

  /* live mini-preview data */
  const previewName = watch("name") || "Facility Name";
  const previewLocation = watch("location") || "Location";
  const previewType = watch("type") || "Type";
  const previewPrice = watch("price") || "—";

  return (
    <div className="min-h-screen bg-[#EBF4DD]">
      {/* ── background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-125 h-125 rounded-full bg-[#90AB8B] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-[#5A7863] opacity-[0.06] blur-3xl" />
      </div>

      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* ════════ PAGE HEADER ════════ */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 rounded-full bg-[#5A7863]" />
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#3B4953] tracking-tight">
              Add New Facility
            </h1>
          </div>
          <p className="text-[13.5px] text-[rgba(59,73,83,0.55)] ml-3 pl-2 border-l-2 border-[rgba(144,171,139,0.3)]">
            Create and manage your sports facility listing.
          </p>
        </div>

        {/* ════════ MAIN LAYOUT ════════ */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ════ LEFT — FORM (70%) ════ */}
          <div className="w-full lg:w-[70%]">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Fieldset className="border-none p-0 m-0 w-full" legend="">
                <div className="flex flex-col gap-6">
                  {/* ── Section 1: Basic Information ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading
                      number="1"
                      title="Basic Information"
                      icon={BiBuildings}
                    />

                    <div className="flex flex-col gap-4">
                      {/* Facility Name */}
                      <FieldWrapper
                        label="Facility Name"
                        required
                        helper="Example: Urban Football Turf"
                        error={errors.name?.message}
                      >
                        <InputBox icon={BiBuildings} error={errors.name}>
                          <input
                            {...register("name", {
                              required: "Facility name is required",
                            })}
                            placeholder="Enter facility name"
                            className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                          />
                        </InputBox>
                      </FieldWrapper>

                      {/* Facility Type */}
                      <FieldWrapper
                        label="Facility Type"
                        required
                        error={errors.type?.message}
                      >
                        <div
                          className={`
                          relative flex items-center h-11 rounded-xl
                          border transition-all duration-200
                          ${
                            errors.type
                              ? "border-red-400 bg-red-50/40"
                              : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                          }
                        `}
                        >
                          <select
                            {...register("type", {
                              required: "Please select a facility type",
                            })}
                            className="w-full h-full px-3.5 bg-transparent text-[13.5px] text-[#3B4953] outline-none appearance-none cursor-pointer"
                          >
                            <option value="">Select facility type</option>
                            {FACILITY_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          <BiChevronDown className="absolute right-3.5 text-[#90AB8B] text-[18px] pointer-events-none" />
                        </div>
                      </FieldWrapper>

                      {/* Location */}
                      <FieldWrapper
                        label="Location"
                        required
                        helper="Example: Dhaka, Sylhet, Rajshahi"
                        error={errors.location?.message}
                      >
                        <InputBox icon={BiMap} error={errors.location}>
                          <input
                            {...register("location", {
                              required: "Location is required",
                            })}
                            placeholder="Enter facility location"
                            className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                          />
                        </InputBox>
                      </FieldWrapper>
                    </div>
                  </div>

                  {/* ── Section 2: Media ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading number="2" title="Media" icon={BiImage} />

                    <FieldWrapper
                      label="Image URL"
                      required
                      helper="Paste a direct image link for preview"
                      error={errors.imageUrl?.message}
                    >
                      <InputBox icon={BiLink} error={errors.imageUrl}>
                        <input
                          {...register("imageUrl", {
                            required: "Image URL is required",
                            pattern: {
                              value: /^https?:\/\/.+/,
                              message: "Must be a valid URL (http/https)",
                            },
                          })}
                          placeholder="Paste facility image URL"
                          // onBlur={handleImageBlur}
                          className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                        />
                      </InputBox>
                    </FieldWrapper>

                    {/* image preview */}
                    {/* <div
                      className={`
                      mt-4 rounded-xl overflow-hidden border transition-all duration-300
                      ${
                        imagePreview
                          ? "border-[rgba(144,171,139,0.3)] h-48"
                          : "border-dashed border-[rgba(144,171,139,0.35)] h-32 flex items-center justify-center bg-[rgba(235,244,221,0.4)]"
                      }
                    `}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Facility preview"
                            // width={600}
                            // height={600}
                            fill
                            className="object-cover"
                            onError={() => setImagePreview("")}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-center px-4">
                          <BiImage className="text-[28px] text-[rgba(144,171,139,0.5)]" />
                          <p className="text-[12px] text-[rgba(59,73,83,0.4)]">
                            Image preview will appear here after you paste a URL
                          </p>
                        </div>
                      )}
                    </div> */}
                  </div>

                  {/* ── Section 3: Pricing & Capacity ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading
                      number="3"
                      title="Pricing & Capacity"
                      icon={BiDollar}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Price */}
                      <FieldWrapper
                        label="Price Per Hour (৳)"
                        required
                        helper="Hourly booking charge"
                        error={errors.price?.message}
                      >
                        <InputBox icon={BiDollar} error={errors.price}>
                          <input
                            {...register("price", {
                              required: "Price is required",
                              min: {
                                value: 1,
                                message: "Price must be greater than 0",
                              },
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="1200"
                            className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                          />
                        </InputBox>
                      </FieldWrapper>

                      {/* Capacity */}
                      <FieldWrapper
                        label="Capacity"
                        required
                        helper="Maximum players allowed"
                        error={errors.capacity?.message}
                      >
                        <InputBox icon={BiGroup} error={errors.capacity}>
                          <input
                            {...register("capacity", {
                              required: "Capacity is required",
                              min: {
                                value: 1,
                                message: "Minimum capacity is 1",
                              },
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="10"
                            className="flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none"
                          />
                        </InputBox>
                      </FieldWrapper>
                    </div>
                  </div>

                  {/* ── Section 4: Available Slots ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading
                      number="4"
                      title="Available Slots"
                      icon={BiCheckCircle}
                    />

                    <p className="text-[12px] text-[rgba(59,73,83,0.5)] mb-4">
                      Select all time slots your facility is available for
                      booking.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const active = selectedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => toggleSlot(slot)}
                            className={`
                              px-3.5 py-2 rounded-xl text-[12.5px] font-medium
                              border transition-all duration-150 active:scale-95
                              ${
                                active
                                  ? "bg-[#5A7863] border-[#5A7863] text-[#EBF4DD] shadow-[0_2px_8px_rgba(90,120,99,0.25)]"
                                  : "bg-[rgba(235,244,221,0.5)] border-[rgba(144,171,139,0.35)] text-[rgba(59,73,83,0.65)] hover:border-[#5A7863] hover:text-[#3B4953] hover:bg-[rgba(235,244,221,0.8)]"
                              }
                            `}
                          >
                            {active && (
                              <span className="mr-1 text-[10px]">✓</span>
                            )}
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    {selectedSlots.length > 0 && (
                      <p className="mt-3 text-[11.5px] text-[#5A7863] font-medium">
                        {selectedSlots.length} slot
                        {selectedSlots.length > 1 ? "s" : ""} selected
                      </p>
                    )}

                    {slotsError && (
                      <p className="mt-2 text-[11.5px] text-red-500 flex items-center gap-1">
                        <span className="text-[10px]">●</span> {slotsError}
                      </p>
                    )}
                  </div>

                  {/* ── Section 5: Description ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading
                      number="5"
                      title="Description"
                      icon={BiText}
                    />

                    <FieldWrapper
                      label="Facility Description"
                      required
                      helper="Describe the facility experience, environment and features."
                      error={errors.description?.message}
                    >
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        rows={5}
                        placeholder="Write facility details..."
                        className={`
                          w-full px-3.5 py-3 rounded-xl text-[13.5px] text-[#3B4953]
                          placeholder:text-[rgba(59,73,83,0.35)] outline-none resize-none
                          border transition-all duration-200
                          ${
                            errors.description
                              ? "border-red-400 bg-red-50/40"
                              : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus:border-[#5A7863] focus:bg-white focus:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
                          }
                        `}
                      />
                    </FieldWrapper>
                  </div>

                  {/* ── Section 6: Owner Information ── */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6">
                    <SectionHeading
                      number="6"
                      title="Owner Information"
                      icon={BiEnvelope}
                    />

                    <FieldWrapper
                      label="Owner Email"
                      helper="Auto-filled from your logged-in account. Not editable."
                    >
                      <InputBox icon={BiEnvelope}>
                        <input
                          value={ownerEmail}
                          readOnly
                          className="flex-1 bg-transparent text-[13.5px] text-[rgba(59,73,83,0.5)] outline-none cursor-not-allowed"
                        />
                        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(144,171,139,0.15)] text-[#5A7863] font-medium border border-[rgba(144,171,139,0.25)] shrink-0">
                          Auto
                        </span>
                      </InputBox>
                    </FieldWrapper>
                  </div>

                  {/* ── Submit button ── */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pb-2">
                    <button
                      type="button"
                      className="
                        w-full sm:w-auto px-6 h-11 rounded-xl
                        border border-[rgba(144,171,139,0.4)] bg-transparent
                        text-[#3B4953] text-[13.5px] font-medium
                        hover:bg-[rgba(235,244,221,0.7)] transition-all duration-200
                      "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="
                        w-full sm:w-auto px-8 h-11 rounded-xl
                        bg-[#5A7863] hover:bg-[#4d6b56] active:scale-[0.98]
                        text-[#EBF4DD] text-[13.5px] font-semibold tracking-wide
                        transition-all duration-200
                        shadow-[0_2px_12px_rgba(90,120,99,0.3)]
                        disabled:opacity-60 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2
                      "
                    >
                      {isSubmitting ? (
                        <>
                          {/* <LuLoader2 className="animate-spin text-[15px]" /> */}
                          Adding Facility…
                        </>
                      ) : (
                        "Add Facility"
                      )}
                    </button>
                  </div>
                </div>
              </Fieldset>
            </Form>
          </div>

          {/* ════ RIGHT — STICKY SIDEBAR (30%) ════ */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col gap-4">
            {/* ── Live Mini Preview ── */}
            <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(144,171,139,0.15)]">
                <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase">
                  Live Preview
                </h3>
              </div>

              {/* image thumb */}
              {/* <div className="h-36 bg-[rgba(235,244,221,0.5)] relative overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={() => {}}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BiImage className="text-[36px] text-[rgba(144,171,139,0.4)]" />
                  </div>
                )}

               
                {previewType && previewType !== "Type" && (
                  <span className="absolute top-2 left-2 text-[10.5px] px-2.5 py-1 rounded-full bg-[#3B4953]/80 text-[#EBF4DD] font-medium backdrop-blur-sm">
                    {previewType}
                  </span>
                )}
              </div> */}

              <div className="px-5 py-4 flex flex-col gap-2">
                <h4 className="text-[14px] font-semibold text-[#3B4953] leading-snug">
                  {previewName}
                </h4>
                <div className="flex items-center gap-1.5 text-[12px] text-[rgba(59,73,83,0.55)]">
                  <BiMap className="text-[#90AB8B] text-[13px]" />
                  {previewLocation}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] font-semibold text-[#5A7863]">
                    {previewPrice && previewPrice !== "—"
                      ? `৳${previewPrice}/hr`
                      : "Price TBD"}
                  </span>
                  {selectedSlots.length > 0 && (
                    <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(144,171,139,0.15)] text-[#5A7863] border border-[rgba(144,171,139,0.25)]">
                      {selectedSlots.length} slots
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Tips card ── */}
            <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-5">
              <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase mb-4">
                Facility Tips
              </h3>
              <ul className="flex flex-col gap-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[rgba(90,120,99,0.15)] flex items-center justify-center shrink-0 mt-[1px]">
                      <BiCheckCircle className="text-[10px] text-[#5A7863]" />
                    </div>
                    <span className="text-[12px] text-[rgba(59,73,83,0.65)] leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Field checklist ── */}
            <div className="bg-[rgba(235,244,221,0.6)] rounded-2xl border border-[rgba(144,171,139,0.2)] p-5">
              <h3 className="text-[12.5px] font-semibold text-[#3B4953] tracking-wide uppercase mb-3">
                Required Fields
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  ["Facility Name", !!watch("name")],
                  ["Facility Type", !!watch("type")],
                  ["Location", !!watch("location")],
                  ["Image URL", !!watch("imageUrl")],
                  ["Price / Hour", !!watch("price")],
                  ["Capacity", !!watch("capacity")],
                  ["Time Slots", selectedSlots.length > 0],
                  ["Description", !!watch("description")],
                ].map(([label, done]) => (
                  <li key={label} className="flex items-center gap-2">
                    <div
                      className={`
                      w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      transition-all duration-200
                      ${
                        done
                          ? "bg-[#5A7863]"
                          : "bg-[rgba(144,171,139,0.2)] border border-[rgba(144,171,139,0.4)]"
                      }
                    `}
                    >
                      {done && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1.5 4l2 2 3-3"
                            stroke="#EBF4DD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-[12px] transition-colors duration-200 ${done ? "text-[#3B4953] font-medium" : "text-[rgba(59,73,83,0.5)]"}`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
