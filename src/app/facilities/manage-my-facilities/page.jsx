import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import ManageFacilitiesClient from "@/components/facility/ManageFacility/ManageFacilitiesClient";

import StatsSummary from "@/components/facility/ManageFacility/StatsSummary";
import { DeleteFacility } from "@/lib/backend/facilities/action";

export const metadata = {
  title: "Manage Facilities — SportNest",
  description: "Manage, update or remove your sports facilities.",
};

export default function ManageFacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#EBF4DD]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-112.5 w-112.5` rounded-full bg-[#90AB8B] opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-95 w-95 rounded-full bg-[#5A7863] opacity-[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-300 px-4 py-10 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2.5">
              <div className="h-7 w-1 rounded-full bg-[#5A7863]" />
              <h1 className="text-[26px] font-bold tracking-tight text-[#3B4953] sm:text-[30px]">
                Manage Facilities
              </h1>
            </div>
            <p className="ml-3.5 border-l-2 border-[rgba(144,171,139,0.3)] pl-2 text-[13.5px] text-[rgba(59,73,83,0.55)]">
              Manage, update or remove your sports facilities.
            </p>
          </div>
          <Link
            href="/facilities/add-facility"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5A7863] px-5 py-2.5 text-[13.5px] font-semibold text-[#EBF4DD] no-underline shrink-0 self-start sm:w-auto shadow-[0_2px_12px_rgba(90,120,99,0.28)] transition-all duration-200 hover:bg-[#4d6b56] active:scale-[0.98]"
          >
            <BiPlus className="text-[18px]" />
            Add Facility
          </Link>
        </div>

        {/* Stats Summary */}
        <StatsSummary />

        {/* Client island */}
        <ManageFacilitiesClient DeleteFacility={DeleteFacility} />
      </div>
    </div>
  );
}
