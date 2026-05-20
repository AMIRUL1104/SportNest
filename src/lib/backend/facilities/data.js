export default async function getFacilities(email = "") {
  try {
    // যদি email থাকে তবে '?email=...' যোগ হবে, না থাকলে খালি থাকবে
    const url = email
      ? `http://localhost:4000/facilities?email=${email}`
      : "http://localhost:4000/facilities";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // অথবা cache: "no-store" (নতুন ডাটা ইনস্ট্যান্ট পাওয়ার জন্য)
    });

    if (!response.ok) {
      console.error("Failed to fetch facilities:", response.statusText);
      return []; // এরর হলে খালি অ্যারে রিটার্ন করা নিরাপদ, যাতে .map() ক্র্যাশ না করে
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function getFacilityById(id) {
  const req = await fetch(`http://localhost:4000/facilities/${id}`);
  const res = await req.json();
  return res;
}

export async function getLimitedFacilities() {
  try {
    const response = await fetch("http://localhost:4000/facilities/limited");

    // রেসপন্স ঠিকঠাক না থাকলে এরর থ্রো করবে
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // JSON থেকে জাভাস্ক্রিপ্ট অবজেক্ট/অ্যারেতে কনভার্ট করে রিটার্ন করবে
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch limited facilities:", error);
    return []; // এরর হলে সেফটি হিসেবে খালি অ্যারে রিটার্ন করবে যাতে ফ্রন্টএন্ড ক্র্যাশ না করে
  }
}
