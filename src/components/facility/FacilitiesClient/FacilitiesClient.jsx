"use client";

import { useEffect, useState, useTransition } from "react";

import FacilityCard from "@/components/shared/FacilityCard/FacilityCard";
import SearchFilterBar from "@/components/shared/SearchFilterBar/SearchFilterBar";
import FacilitySkeleton from "@/components/shared/FacilitySkeleton/FacilitySkeleton";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import getFacilities from "@/lib/backend/facilities/data";
// import getFacilities from "@/services/getFacilities";

/* ═══════════════════════════════════════════
   FACILITIES CLIENT — Client Island
═══════════════════════════════════════════ */
export default function FacilitiesClient() {
  const [facilities, setFacilities] = useState([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("");
  const [isPending, startTransition] = useTransition();

  // backend search + filter
  useEffect(() => {
    const loadFacilities = async () => {
      startTransition(async () => {
        const data = await getFacilities("", search, typeFilter);

        setFacilities(data);
      });
    };

    loadFacilities();
  }, [search, typeFilter]);

  const hasFilters = search.trim() !== "" || typeFilter !== "";

  const handleSetType = (val) => {
    startTransition(() => {
      setType(val);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      setSearch("");
      setType("");
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* search + filter */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={handleSetType}
        placeholder="Search by facility name…"
      />

      {/* result summary */}
      <div className="flex items-center px-0.5">
        <p className="text-[13px] text-[rgba(59,73,83,0.55)]">
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#90AB8B] border-t-transparent" />
              Filtering…
            </span>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-[#3B4953]">
                {facilities.length}
              </span>{" "}
              facilit
              {facilities.length === 1 ? "y" : "ies"}
              {hasFilters && (
                <span className="ml-1 text-[#5A7863]">· filtered</span>
              )}
            </>
          )}
        </p>
      </div>

      {/* grid / skeleton / empty */}
      {isPending ? (
        <FacilitySkeleton variant="browse" count={6} />
      ) : facilities.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility._id ?? facility.id}
              facility={facility}
              variant="browse"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          variant="browse"
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      )}
    </div>
  );
}
