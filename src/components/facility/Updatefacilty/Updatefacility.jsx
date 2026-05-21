"use client";

import { useForm } from "react-hook-form";
import {
  BiBuildings,
  BiMap,
  BiLink,
  BiDollar,
  BiGroup,
  BiText,
  BiEnvelope,
  BiChevronDown,
  BiTime,
  BiSave,
} from "react-icons/bi";

const FACILITY_TYPES = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Swimming",
  "Other",
];

// ─── Reusable sub-components ──────────────────────────────────────────────────

function SectionCard({ number, title, icon: Icon, children }) {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl border border-[rgba(144,171,139,0.2)] shadow-[0_2px_16px_rgba(59,73,83,0.06)] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2.5 mb-1">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5A7863] text-[11px] font-bold text-[#EBF4DD]">
          {number}
        </span>
        <Icon className="text-[#5A7863] text-[16px]" />
        <h2 className="text-[13.5px] font-semibold text-[#3B4953]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FieldWrapper({ label, required, helper, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[rgba(59,73,83,0.75)]">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p className="text-[11.5px] text-[rgba(59,73,83,0.4)]">{helper}</p>
      )}
      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}

function InputBox({ icon: Icon, error, children }) {
  return (
    <div
      className={`
      relative flex items-center h-11 rounded-xl px-3.5 gap-2.5
      border transition-all duration-200
      ${
        error
          ? "border-red-400 bg-red-50/40"
          : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus-within:border-[#5A7863] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(90,120,99,0.1)]"
      }
    `}
    >
      {Icon && <Icon className="text-[#90AB8B] text-[16px] shrink-0" />}
      {children}
    </div>
  );
}

const inputClass =
  "flex-1 bg-transparent text-[13.5px] text-[#3B4953] placeholder:text-[rgba(59,73,83,0.35)] outline-none";

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function UpdateFacilityForm({ facility, UpdateFacility }) {
  const slots = Array.isArray(facility.slots)
    ? facility.slots.join(",")
    : facility.slots || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: facility.name || "",
      type: facility.type || "",
      location: facility.location || "",
      imageUrl: facility.imageUrl || facility.image || "",
      price: facility.pricePerHour || facility.price || "",
      capacity: facility.capacity || "",
      slots: slots,
      description: facility.description || "",
      ownerEmail: facility.ownerEmail || "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      slots: data.slots
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    UpdateFacility(facility._id, payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 animate__animated animate__fadeIn"
    >
      {/* Section 1: Basic Information */}
      <SectionCard number="1" title="Basic Information" icon={BiBuildings}>
        <FieldWrapper
          label="Facility Name"
          required
          error={errors.name?.message}
          helper="Example: Urban Football Turf"
        >
          <InputBox icon={BiBuildings} error={errors.name}>
            <input
              {...register("name", { required: "Facility name is required" })}
              placeholder="Enter facility name"
              className={inputClass}
            />
          </InputBox>
        </FieldWrapper>

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
                : "border-[rgba(144,171,139,0.4)] bg-[#EBF4DD]/50 focus-within:border-[#5A7863] focus-within:bg-white"
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

        <FieldWrapper
          label="Location"
          required
          error={errors.location?.message}
          helper="Example: Dhaka, Sylhet"
        >
          <InputBox icon={BiMap} error={errors.location}>
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="Enter facility location"
              className={inputClass}
            />
          </InputBox>
        </FieldWrapper>
      </SectionCard>

      {/* Section 2: Media */}
      <SectionCard number="2" title="Media" icon={BiLink}>
        <FieldWrapper
          label="Image URL"
          required
          error={errors.imageUrl?.message}
          helper="Paste a direct image link"
        >
          <InputBox icon={BiLink} error={errors.imageUrl}>
            <input
              {...register("imageUrl", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Must be a valid URL",
                },
              })}
              placeholder="Paste facility image URL"
              className={inputClass}
            />
          </InputBox>
        </FieldWrapper>
      </SectionCard>

      {/* Section 3: Pricing & Capacity */}
      <SectionCard number="3" title="Pricing & Capacity" icon={BiDollar}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper
            label="Price Per Hour (৳)"
            required
            error={errors.price?.message}
            helper="Hourly booking charge"
          >
            <InputBox icon={BiDollar} error={errors.price}>
              <input
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="1200"
                className={inputClass}
              />
            </InputBox>
          </FieldWrapper>

          <FieldWrapper
            label="Capacity"
            required
            error={errors.capacity?.message}
            helper="Maximum players allowed"
          >
            <InputBox icon={BiGroup} error={errors.capacity}>
              <input
                {...register("capacity", {
                  required: "Capacity is required",
                  min: { value: 1, message: "Minimum capacity is 1" },
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="10"
                className={inputClass}
              />
            </InputBox>
          </FieldWrapper>
        </div>
      </SectionCard>

      {/* Section 4: Available Slots */}
      <SectionCard number="4" title="Available Slots" icon={BiTime}>
        <FieldWrapper
          label="Time Slots"
          required
          error={errors.slots?.message}
          helper="Comma-separated. Example: 8AM-9AM,9AM-10AM,10AM-11AM"
        >
          <InputBox icon={BiTime} error={errors.slots}>
            <input
              {...register("slots", {
                required: "At least one slot is required",
              })}
              placeholder="8AM-9AM,9AM-10AM,10AM-11AM"
              className={inputClass}
            />
          </InputBox>
        </FieldWrapper>
      </SectionCard>

      {/* Section 5: Description */}
      <SectionCard number="5" title="Description" icon={BiText}>
        <FieldWrapper
          label="Facility Description"
          required
          error={errors.description?.message}
          helper="Describe the facility experience and features."
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
      </SectionCard>

      {/* Section 6: Owner Information */}
      <SectionCard number="6" title="Owner Information" icon={BiEnvelope}>
        <FieldWrapper label="Owner Email" helper="Auto-filled. Not editable.">
          <InputBox icon={BiEnvelope}>
            <input
              {...register("ownerEmail")}
              readOnly
              className="flex-1 bg-transparent text-[13.5px] text-[rgba(59,73,83,0.5)] outline-none cursor-not-allowed"
            />
            <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[rgba(144,171,139,0.15)] text-[#5A7863] font-medium border border-[rgba(144,171,139,0.25)] shrink-0">
              Auto
            </span>
          </InputBox>
        </FieldWrapper>
      </SectionCard>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-6 h-11 rounded-xl border border-[rgba(144,171,139,0.4)] bg-transparent text-[#3B4953] text-[13.5px] font-medium hover:bg-[rgba(235,244,221,0.7)] transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 h-11 rounded-xl bg-[#5A7863] hover:bg-[#4d6b56] active:scale-[0.98] text-[#EBF4DD] text-[13.5px] font-semibold tracking-wide transition-all duration-200 shadow-[0_2px_12px_rgba(90,120,99,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <BiSave className="text-[16px]" />
          {isSubmitting ? "Updating…" : "Update Facility"}
        </button>
      </div>
    </form>
  );
}
