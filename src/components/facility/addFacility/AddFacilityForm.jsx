"use client";

import { useState, useRef, useContext } from "react";
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
import { UserInfoContext } from "@/context/UserInfoContext";
import SectionHeading from "./SectioinHeading";
import FieldWrapper from "./FieldWrapper";
import InputBox from "./InputBox";
import TipsCard from "./TipsCard";
import FieldCheckList from "./FieldCheckList";

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

function AddFacilityForm({ AddFacility }) {
  const [selectedSlots, setSelectedSlots] = useState([]);
  // const [imagePreview, setImagePreview] = useState("");
  const [slotsError, setSlotsError] = useState("");

  const { userInfo } = useContext(UserInfoContext);
  // console.log(userInfo);

  const ownerEmail = userInfo?.email || "";

  /* slot toggle */
  const toggleSlot = (slot) => {
    setSlotsError("");
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

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
    AddFacility(payload);
    // await yourApiCall(payload);
  };

  return (
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
                  Select all time slots your facility is available for booking.
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
                        {active && <span className="mr-1 text-[10px]">✓</span>}
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
                <SectionHeading number="5" title="Description" icon={BiText} />

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

        {/* ── Tips card ── */}
        <TipsCard />

        {/* ── Field checklist ── */}
        <FieldCheckList selectedSlots={selectedSlots} watch={watch} />
      </div>
    </div>
  );
}

export default AddFacilityForm;
