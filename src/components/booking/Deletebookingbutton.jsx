// _components/DeleteBookingButton.jsx
// Client Component

"use client";

import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function DeleteBookingButton({ bookingId, DeleteBooking }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    DeleteBooking(bookingId);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
          isHovered
            ? "bg-red-500 text-white"
            : "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:border-red-300"
        }`}
      >
        <FaTrash className="text-xs" />
        Cancel
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate__animated animate__fadeIn">
          {/* Modal Card */}
          <div className="w-full max-w-sm rounded-2xl bg-white/70 p-6 shadow-lg animate__animated animate__zoomIn">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Delete Booking
              </h2>
            </div>

            {/* Message */}
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
              >
                Keep It
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
