import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";

export default function useUser() {
  return useContext(UserContext);
}
