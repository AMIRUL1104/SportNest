// app/profile/page.jsx
// Server Component

import ProfileHeader from "@/components/userProfile/Profileheader";
import ProfileInfoCard from "@/components/userProfile/Profileinfocard";
import ProfileQuickActions from "@/components/userProfile/Profilequickactions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = { title: "My Profile | SportNest" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Mock data — replace with real session fields as needed
  const user = {
    name: session?.user?.name || "SportNest User",
    email: session?.user?.email || "user@sportnest.com",
    image: session?.user?.image || null,
    createdAt: session?.user?.createdAt || null,
  };

  return (
    <main className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
      <div className="mx-auto max-w-3xl flex flex-col gap-5">
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProfileInfoCard user={user} />
          <ProfileQuickActions />
        </div>
      </div>
    </main>
  );
}
