import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import Navbar from "./comps/Navbar";
import Homepage, { roomsLoader } from "./Pages/Homepage";
import Chatroom, { chat_data_loader } from "./Pages/Chatroom";
import ErrorBoundary from "./Pages/ErrorBoundary";
import ChatroomErrorBoundary, {
  formAction,
} from "./Pages/ChatroomErrorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />} errorElement={<ErrorBoundary />}>
      <Route index element={<Homepage />} loader={roomsLoader} />
      <Route
        path="chatroom/:chatroomId"
        element={
          <SignedIn>
            <Chatroom />
          </SignedIn>
        }
        loader={chat_data_loader}
        shouldRevalidate={() => false} //doesn't run loader when form action is fired
      />
      <Route
        path="chatroom"
        element={
          <SignedIn>
            <ChatroomErrorBoundary />
          </SignedIn>
        }
        action={formAction}
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
