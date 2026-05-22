// _components/ProfileHeader.jsx
// Server Component

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileHeader({ user }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-6 flex flex-col items-center text-center gap-4 animate__animated animate__fadeIn">

      {/* Avatar */}
      {user.image ? (
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2">
          <Image src={user.image} alt={user.name} fill className="object-cover" sizes="80px" />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20 ring-offset-2">
          <FaUserCircle className="text-5xl text-primary/50" />
        </div>
      )}

      {/* Identity */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Welcome back to SportNest
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <span className="mx-auto mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          SportNest Member
        </span>
      </div>

    </div>
  );
}