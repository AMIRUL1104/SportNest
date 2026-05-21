// _components/UpdateFacilityHeader.jsx
// Server Component

import { BiBuildings } from "react-icons/bi";

export default function UpdateFacilityHeader({ facility }) {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <BiBuildings className="text-[#5A7863] text-xl" />
        <h1 className="text-2xl font-bold tracking-tight text-[#3B4953]">
          Update Facility
        </h1>
      </div>
      <p className="text-sm text-[rgba(59,73,83,0.55)] pl-7">
        Editing:{" "}
        <span className="font-medium text-[#5A7863]">{facility.name}</span>
      </p>
    </div>
  );
}
