/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function GoogleSignIn({
  login,
  open,
  setOpen,
  children = null,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger className=" bg-slate-950 text-white rounded-sm  text-xs tracking-widest"> */}
      {children}
      {/* </DialogTrigger> */}
      <DialogContent>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => navigation("/")}
        >
          <img
            src="/assets/image/logo_expense_tracker.png"
            className="w-[35px] h-[35px]"
          />
          <p className="text-xl font-Inter font-extrabold text-teal-800 ">
            Expense Tracker
          </p>
        </div>
        <DialogHeader>
          <DialogTitle>Sign in to continue.</DialogTitle>
          <DialogDescription>
            Sign in securely with Google authentication.
            <Button
              onClick={login}
              className="w-full mt-5 flex flex-row gap-5 items-center bg-black hover:bg-slate-900"
            >
              <FcGoogle className="h-7 w-7" />
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
