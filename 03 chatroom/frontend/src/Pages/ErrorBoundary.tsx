import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "../components/mode-toggle";

const ErrorBoundary = () => {
  return (
    <>
      <div className="min-h-screen dark:bg-black dark:text-white bg-white  text-black p-1">
        <div className="w-full flex justify-between items-center py-3">
          <Link to="/">Home</Link>
          <aside className="flex justify-between items-center gap-4">
            <UserButton />
            <ModeToggle />
          </aside>
        </div>

        <summary className="min-h-screen flex flex-col justify-center items-center text-4xl">
          <span>Looks like an error has occured</span>
          <Link to="/" className="texl-xl text-sky-500">
            Go Back to Home
          </Link>
        </summary>
      </div>
    </>
  );
};

export default ErrorBoundary;
