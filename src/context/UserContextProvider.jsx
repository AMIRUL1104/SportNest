"use client";
import { authClient } from "@/lib/auth-client";
import { UserInfoContext } from "./UserInfoContext";

function UserContextProvider({ children }) {
  // login sesion  info
  const { data: session, isPending } = authClient.useSession();
  const userInfo = session?.user;

  const userData = { userInfo, isPending };

  return (
    <UserInfoContext.Provider value={userData}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserContextProvider;
