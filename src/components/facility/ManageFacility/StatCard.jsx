import getFacilities from "@/lib/backend/facilities/data";

export default async function StatCard({
  icon: Icon,
  label,
  accent,
  userInfo,
}) {
  const facilities = await getFacilities(userInfo.email);
  const totalBookings = facilities.reduce(
    (sum, f) => sum + (f.bookingCount ?? 0),
    0,
  );
  // console.log(userInfo);

  const value = facilities.length;
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[rgba(144,171,139,0.2)] bg-white/75 p-4 shadow-[0_2px_12px_rgba(59,73,83,0.06)] backdrop-blur-sm">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${accent}18` }}
      >
        <Icon className="text-[22px]" style={{ color: accent }} />
      </div>
      <div>
        <p className="mb-1 text-[11.5px] font-medium leading-none text-[rgba(59,73,83,0.5)]">
          {label}
        </p>
        <p className="text-[22px] font-bold leading-none text-[#3B4953]">
          {accent === "#5A7863" ? value : totalBookings}
        </p>
      </div>
    </div>
  );
}
