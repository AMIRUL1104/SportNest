export async function getMyBookings(userEmail) {
  // Implementation for fetching user's bookings
  try {
    // যদি email থাকে তবে '?email=...' যোগ হবে, না থাকলে খালি থাকবে
    const url = `http://localhost:4000/bookings?userEmail=${userEmail}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // অথবা cache: "no-store" (নতুন ডাটা ইনস্ট্যান্ট পাওয়ার জন্য)
    });

    if (!response.ok) {
      console.error("Failed to fetch bookings:", response.statusText);
      return []; // এরর হলে খালি অ্যারে রিটার্ন করা নিরাপদ, যাতে .map() ক্র্যাশ না করে
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
