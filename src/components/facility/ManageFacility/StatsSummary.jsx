import StatCard from "./StatCard";
import { BiBuildings, BiGrid } from "react-icons/bi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function StatsSummary() {
  // login sesion  info
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userInfo = session?.user;
  // console.log(userInfo);

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={BiBuildings}
        label="Total Facilities"
        accent="#5A7863"
        userInfo={userInfo}
      />
      <StatCard
        icon={BiGrid}
        label="Total Bookings"
        accent="#3B4953"
        userInfo={userInfo}
      />
    </div>
  );
}

export default StatsSummary;
