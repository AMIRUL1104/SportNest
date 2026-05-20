"use client";

import { Spinner } from "@heroui/react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

function DeleteFacilityButton({ id, DeleteFacility }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await DeleteFacility(id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="
                  flex items-center gap-1 px-3 py-1.5 rounded-lg
                  border border-[rgba(239,68,68,0.35)] bg-transparent
                  text-red-400 text-[12px] font-medium
                  hover:bg-red-50 hover:border-[rgba(239,68,68,0.65)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
    >
      {deleting ? (
        <div className="flex flex-col items-center gap-2">
          <Spinner size="xs" />
          {/* <span className="text-xs text-muted">Extra Large</span> */}
        </div>
      ) : (
        <BiTrash className="text-[13px]" />
      )}
      {deleting ? " Deleting…" : "Delete"}
    </button>
  );
}

export default DeleteFacilityButton;
