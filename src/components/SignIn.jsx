/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import GoogleSignIn from "./GoogleSignIn";
import { Button } from "./ui/button";
import getUserInfo from "@/utils/getUserInfo";
import { useState } from "react";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import { queryClient } from "../main";

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const { setUser } = useUser();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userData = await getUserInfo(tokenResponse);
      queryClient.invalidateQueries(["expenses"]);
      queryClient.invalidateQueries(["incomes"]);
      setUser(userData);
      setOpen(false);
    },
    onError: () => {
      toast.error("Error while signin up!");
    },
  });
  return (
    <GoogleSignIn open={open} setOpen={setOpen} login={login}>
      <Button className="bg-teal-800" onClick={() => setOpen(true)}>
        Sign In
      </Button>
    </GoogleSignIn>
  );
}
