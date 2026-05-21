import FacilityDetailsLeft from "@/components/FacilityDetails/FacilityDetailsLeft";
import FacilityDetailsRight from "@/components/FacilityDetails/FacilityDetailsRight";
import { getFacilityById } from "@/lib/backend/facilities/data";
import { notFound } from "next/navigation";

// ডামি ডাটা ফেচিং ফাংশন (তোমার রিয়েল ডাটাবেজ ফাংশন দিয়ে রিপ্লেস করবে)
// async function getFacilityData(id) {
//   // উদাহরণস্বরূপ ডামি ডাটা
//   const facilities = {
//     1: {
//       id: "1",
//       name: "Elite Turf & Indoor Arena",
//       type: "Football",
//       location: "Dhanmondi, Dhaka",
//       capacity: "14 Players",
//       pricePerHour: 1500,
//       ownerEmail: "owner@sportnest.com",
//       image:
//         "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600",
//       description:
//         "Premium quality artificial turf perfect for 5-a-side and 7-a-side football matches. Features high-intensity LED lighting, comfortable dugout zones, and complimentary mineral water.",
//       slots: ["8AM–9AM", "9AM–10AM", "10AM–11AM", "4PM–5PM", "5PM–6PM"],
//     },
//   };
//   return facilities[id] || null;
// }

export default async function FacilityDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);

  const facility = await getFacilityById(id);
  console.log(facility);

  if (!facility) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-6 md:py-12 px-4 max-w-7xl mx-auto animate__animated animate__fadeIn">
      {/* 
        Flex Layout Configuration:
        Mobile: flex-col-reverse (Right component rendering first on top)
        Desktop: md:flex-row (Left | Right)
      */}
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
