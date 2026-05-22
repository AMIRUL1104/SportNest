// _components/LogoutButton.jsx
// Client Component

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 transition-all hover:bg-red-100 dark:hover:bg-red-950/60 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaSignOutAlt className="text-sm" />
      {loading ? "Logging out…" : "Log Out"}
    </button>
  );
}
