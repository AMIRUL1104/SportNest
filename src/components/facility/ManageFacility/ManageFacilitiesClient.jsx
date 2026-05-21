"use client";

import SearchFilterBar from "@/components/shared/SearchFilterBar/SearchFilterBar";
import { useState, useTransition } from "react";
import ClientMainPart from "./ClientMainPart";
// import { UserInfoContext } from "@/context/UserInfoContext";

/* ═══════════════════════════════════════════
   MANAGE FACILITIES CLIENT  — Client Island
   Manage Facilities page
═══════════════════════════════════════════ */
export default function ManageFacilitiesClient({ DeleteFacility, userEmail }) {
  // const { userInfo } = useContext(UserInfoContext);
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("");
  const [isPending, startTrans] = useTransition();

  const ownerEmail = userEmail;

  const handleSetType = (val) => startTrans(() => setType(val));

  return (
    <div className="flex flex-col gap-6">
      {/* search + filter */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={handleSetType}
        placeholder="Search your facilities…"
      />

      <ClientMainPart
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setType={setType}
        startTrans={startTrans}
        isPending={isPending}
        ownerEmail={ownerEmail}
        DeleteFacility={DeleteFacility}
      />
    </div>
  );
}
