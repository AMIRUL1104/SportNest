// _components/ProfileInfoCard.jsx
// Server Component

import { FaUser, FaEnvelope, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/40 border border-border/50 px-4 py-3">
      <Icon className="text-primary text-sm shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function ProfileInfoCard({ user }) {
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Member";

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-6 flex flex-col gap-4 animate__animated animate__fadeIn">
      <h2 className="text-sm font-semibold text-foreground">Account Details</h2>

      <div className="flex flex-col gap-3">
        <InfoRow icon={FaUser} label="Full Name" value={user.name} />
        <InfoRow icon={FaEnvelope} label="Email Address" value={user.email} />
        <InfoRow icon={FaCheckCircle} label="Account Status" value="Active Member" />
        <InfoRow icon={FaCalendarAlt} label="Member Since" value={joinDate} />
      </div>
    </div>
  );
}