import { CardWithForm } from "../comps/Card";
import { SignInButton } from "@clerk/clerk-react";
import { Key } from "lucide-react";
import { useSession } from "@clerk/clerk-react";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const roomsLoader = async () => {
  const res = await fetch("/api/rooms");
  const res_rooms = await res.json();

  return res_rooms;
};

const Homepage = () => {
  const { isLoaded, isSignedIn } = useSession();
  const rooms_data = useLoaderData() as string[];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-sm gap-1.5 flex justify-center items-center">
        <CardWithForm rooms={rooms_data} />
      </div>

      {isLoaded && !isSignedIn ? (
        <figure className="flex space-x-2 p-2 hover:text-zinc-500">
          <Key />
          <SignInButton />
        </figure>
      ) : null}
    </div>
  );
};

export default Homepage;
