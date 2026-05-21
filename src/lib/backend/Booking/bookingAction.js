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
