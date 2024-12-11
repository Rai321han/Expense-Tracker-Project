/* eslint-disable react/prop-types */
import useUser from "@/hooks/useUser";
import { Button } from "./ui/button";
import { googleLogout } from "@react-oauth/google";

export default function LogOut() {
  const { setUser } = useUser();
  return (
    <Button
      className="bg-[#F9FAFB] border text-gray-400"
      onClick={() => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("user");
      }}
    >
      Logout
    </Button>
  );
}
