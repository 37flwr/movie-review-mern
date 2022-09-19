import Navbar from "./components/user/Navbar";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import UserNavigator from "./navigator/UserNavigator";

export default function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;

  return (
    <>
      <Navbar />
      <UserNavigator />
    </>
  );
}
