import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import { revalidatePath } from "next/cache";

export async function AddFacility(formData) {
  "use server";
  let result;

  try {
    const response = await fetch("http://localhost:4000/facilities", {
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
    redirect("/facilities/manage-my-facilities");
  }

  return result;
}

export async function DeleteFacility(facilityId) {
  "use server";

  try {
    if (!facilityId) {
      return { error: "Facility ID is required", deletedCount: 0 };
    }

    const res = await fetch(`http://localhost:4000/facilities/${facilityId}`, {
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
    if (result.deletedCount > 0) {
      revalidatePath("/facilities/manage-my-facilities");
      toast("Facility deleted successfully!");
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

export async function UpdateFacility(id, formData) {
  "use server";
  const UpdatedData = Object.fromEntries(formData.entries());

  // console.log(UpdatedData);

  const req = await fetch(`http://localhost:4000/facilities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(UpdatedData),
  });

  const res = await req.json();
  // console.log("after update ", res);

  if (res.modifiedCount > 0) {
    redirect(`/facilities/${id}`);
  }

  return res;
}
