export const dynamic = "force-dynamic";
import FacilitiesClient from "@/components/facility/FacilitiesClient/FacilitiesClient";
import getFacilities from "@/lib/backend/facilities/data";

/* ═══════════════════════════════════════════
   ALL FACILITIES PAGE  — Server Component
═══════════════════════════════════════════ */
export const metadata = {
  title: "All Facilities — SportNest",
  description: "Browse and book premium sports facilities near you.",
};

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <div className="min-h-screen bg-[#EBF4DD]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-112.5 w-112.5 rounded-full bg-[#90AB8B] opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-95 w-95 rounded-full bg-[#5A7863] opacity-[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-300 px-4 py-10 sm:px-6 lg:px-10">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2.5">
            <div className="h-7 w-1 rounded-full bg-[#5A7863]" />
            <h1 className="text-[26px] font-bold tracking-tight text-[#3B4953] sm:text-[30px]">
              All Facilities
            </h1>
          </div>
          <p className="ml-3.5 border-l-2 border-[rgba(144,171,139,0.3)] pl-2 text-[13.5px] text-[rgba(59,73,83,0.55)]">
            Discover and book premium sports facilities near you.
          </p>
        </div>

        {/* ── Client island: search + filter + grid ── */}
        <FacilitiesClient />
      </div>
    </div>
  );
}
