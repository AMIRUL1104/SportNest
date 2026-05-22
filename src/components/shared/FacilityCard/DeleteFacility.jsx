"use client";

import { Spinner } from "@heroui/react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

function DeleteFacilityButton({ id, DeleteFacility }) {
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await DeleteFacility(id);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Delete Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
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
        <BiTrash className="text-[13px]" />
        Delete
      </button>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate__animated animate__fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-white/70 p-6 shadow-lg animate__animated animate__zoomIn">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Delete Facility
              </h2>
            </div>

            {/* Message */}
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to delete this facility? This action is
              permanent and cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
              >
                Keep It
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Spinner size="xs" /> Deleting…
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteFacilityButton;
