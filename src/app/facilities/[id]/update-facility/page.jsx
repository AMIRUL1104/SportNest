// app/facilities/[id]/update-facility/page.jsx
// Server Component

import { notFound } from "next/navigation";
import { getFacilityById } from "@/lib/backend/facilities/data";
import UpdateFacilityForm from "@/components/facility/Updatefacilty/Updatefacility";
import UpdateFacilityHeader from "@/components/facility/Updatefacilty/Updatefacilityheader";
import { UpdateFacility } from "@/lib/backend/facilities/action";

export const metadata = { title: "Update Facility" };

export default async function UpdateFacilityPage({ params }) {
  const { id } = await params;
  const facility = await getFacilityById(id);

  if (!facility) notFound();

  return (
    <main className="min-h-screen bg-[#F7FAF5] py-8 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
      <div className="mx-auto max-w-2xl">
        <UpdateFacilityHeader facility={facility} />
        <UpdateFacilityForm
          facility={facility}
          UpdateFacility={UpdateFacility}
        />
      </div>
    </main>
  );
}
