import { redirect } from "next/navigation";
import { toast } from "react-toastify";

import { revalidatePath } from "next/cache";

export async function AddFacility(formData) {
  "use server";
  let result;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SPORTNEST_DATA_API}/facilities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SPORTNEST_DATA_API}/facilities/${facilityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      return {
        error: `Failed to delete destination: ${res.statusText}`,
        deletedCount: 0,
      };
    }

    const result = await res.json();
    console.log(result);

    if (result.deletedCount > 0) {
      revalidatePath(`/facilities/manage-my-facilities`);
      // toast("Facility deleted successfully!");
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
  // const UpdatedData = Object.fromEntries(formData.entries());

  // console.log(UpdatedData);

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SPORTNEST_DATA_API}/facilities/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  const res = await req.json();
  // console.log("after update ", res);

  if (res.modifiedCount > 0) {
    redirect(`/facilities/${id}`);
  }

  return res;
}
