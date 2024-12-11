/* eslint-disable react/prop-types */
import LogOut from "./LogOut";
import SignIn from "./SignIn";
import useUser from "@/hooks/useUser";

export default function NavBar() {
  const { user } = useUser();
  return (
    <nav>
      <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1  border px-4 rounded-md mx-auto">
        <div>
          <img src="/assets/image/logo_expense_tracker.png" className="h-12" />
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-4 text-gray-500 font-medium">
            <li>Home</li>
            <li>App</li>
            <li>Account</li>
            <li>Export</li>
          </ul>
        </div>

        <div className=" flex flex-row gap-2">
          {user ? <LogOut /> : <SignIn />}
          {user && (
            <div className="rounded-full  bg-teal-600 text-white w-10">
              <div>
                <img
                  src={user.picture}
                  alt="profile picture"
                  className="rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
