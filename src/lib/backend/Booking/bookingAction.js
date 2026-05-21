import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function AddBooking(formData) {
  "use server";
  let result;

  try {
    const response = await fetch("http://localhost:4000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    result = await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }

  // try-catch এর বাইরে redirect
  if (result.insertedId) {
    redirect("/my-bookings");
  }

  return result;
}

export async function DeleteBooking(bookingId) {
  "use server";

  try {
    if (!bookingId) {
      return { error: "Booking ID is required", deletedCount: 0 };
    }

    const res = await fetch(`http://localhost:4000/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        error: `Failed to delete destination: ${res.statusText}`,
        deletedCount: 0,
      };
    }

    const result = await res.json();
    console.log(result);

    if (result.deletedCount > 0) {
      revalidatePath("/my-bookings");
      // toast("Booking  deleted successfully!");
    }

    return {
      ...result,
      deletedCount: result.deletedCount || 0,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Something went wrong while deleting!", deletedCount: 0 };
  }
}
