import UserContextProvider from "@/context/UserContextProvider";

function Provides({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default Provides;
