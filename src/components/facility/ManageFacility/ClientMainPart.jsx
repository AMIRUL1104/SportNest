"use client";

import { useEffect, useState } from "react";
import FacilityCard from "@/components/shared/FacilityCard/FacilityCard";
import FacilitySkeleton from "@/components/shared/FacilitySkeleton/FacilitySkeleton";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import getFacilities from "@/lib/backend/facilities/data";

function ClientMainPart({
  search,
  typeFilter,
  setSearch,
  setType,
  startTrans,
  isPending,
  ownerEmail,
  DeleteFacility,
}) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ক্লায়েন্ট কম্পোনেন্টে ডাটা আনার সঠিক নিয়ম
  useEffect(() => {
    if (ownerEmail) {
      setLoading(true);
      getFacilities(ownerEmail)
        .then((data) => {
          setFacilities(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching facilities:", err);
          setLoading(false);
        });
    }
  }, [ownerEmail]); // ওনার ইমেইল চেঞ্জ হলে বা প্রথমবার পেজ লোড হলে শুধু একবার রান হবে

  // ২. ফিল্টারিং লজিক (ফাংশন না বানিয়ে সরাসরি ভ্যারিয়েবল করা হয়েছে)
  const q = search.trim().toLowerCase();
  const filteredFacilities = facilities.filter((f) => {
    const matchName = !q || f.name.toLowerCase().includes(q);
    const matchType = !typeFilter || f.type === typeFilter;
    return matchName && matchType;
  });

  const hasFilters = search.trim() !== "" || typeFilter !== "";

  const clearFilters = () => {
    startTrans(() => {
      setSearch("");
      setType("");
    });
  };

  /* wire up your delete logic here */

  // ডাটা লোড হওয়ার সময় স্কেলিটন দেখাবে
  if (loading) {
    return <FacilitySkeleton variant="manage" count={6} />;
  }

  return (
    <>
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
              <span className="font-semibold text-[#3B4953]">
                {filteredFacilities.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#3B4953]">
                {facilities.length}
              </span>{" "}
              facilit{facilities.length === 1 ? "y" : "ies"} listed
              {hasFilters && (
                <span className="ml-1 text-[#5A7863]">· filtered</span>
              )}
            </>
          )}
        </p>
      </div>

      {/* grid / skeleton / empty */}
      {isPending ? (
        <FacilitySkeleton variant="manage" count={6} />
      ) : filteredFacilities.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility._id ?? facility.id}
              facility={facility}
              variant="manage"
              DeleteFacility={DeleteFacility}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          variant="manage"
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      )}
    </>
  );
}

export default ClientMainPart;
