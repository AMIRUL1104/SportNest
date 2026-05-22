import FacilityDetailsLeft from "@/components/FacilityDetails/FacilityDetailsLeft";
import FacilityDetailsRight from "@/components/FacilityDetails/FacilityDetailsRight";
import { getFacilityById } from "@/lib/backend/facilities/data";
import { notFound } from "next/navigation";

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;

  const facility = await getFacilityById(id);

  if (!facility) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 md:py-12 px-4 max-w-7xl mx-auto animate__animated animate__fadeIn">
      <div className="flex flex-col-reverse md:flex-row gap-6 lg:gap-10 items-start">
        {/* Left Side: 65% width on desktop */}
        <div className="w-full md:w-[65%]">
          <FacilityDetailsLeft facility={facility} />
        </div>

        {/* Right Side: 35% width on desktop & Sticky */}
        <div className="w-full md:w-[35%] md:sticky md:top-6">
          <FacilityDetailsRight facility={facility} />
        </div>
      </div>
    </div>
  );
}
