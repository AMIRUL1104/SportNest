import { AddFacility } from "@/lib/backend/facilities/action";
import AddFacilityForm from "@/components/facility/addFacility/AddFacilityForm";

/* ═══════════════════════════════════════════
   ADD FACILITY PAGE
═══════════════════════════════════════════ */
export default function AddFacilityPage() {
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
        <AddFacilityForm AddFacility={AddFacility} />
      </div>
    </div>
  );
}
