import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-white  text-black p-1">
      <div className="w-full flex justify-between items-center py-3">
        <Link to="/">Home</Link>
        <aside className="flex justify-between items-center gap-4">
          <UserButton />
          <ModeToggle />
        </aside>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
