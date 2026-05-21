export default async function getFacilities(
  email = "",
  search = "",
  type = "",
) {
  try {
    const params = new URLSearchParams();

    if (email) {
      params.append("email", email);
    }

    if (search) {
      params.append("search", search);
    }

    if (type) {
      params.append("type", type);
    }

    const url = `http://localhost:4000/facilities?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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
