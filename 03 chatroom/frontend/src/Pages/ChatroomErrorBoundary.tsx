import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, redirect, useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const formAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  try {
    const res = await fetch(`/api/rooms/${formData.get("chatroomName")}`);
    const responseData = await res.json();
    if (responseData.success) {
      return redirect(`./${responseData?.roomName}`);
    } else {
      return redirect("/");
    }
  } catch (error) {
    console.log(error);
    return redirect(".");
  }
};

const ChatroomErrorBoundary = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Form
        className="flex flex-col justify-center items-center gap-3"
        method="POST"
      >
        <Label htmlFor="chatroomName" className="self-start">
          Type Room number to enter
        </Label>
        <Input
          type="text"
          id="chatroomName"
          name="chatroomName"
          placeholder="Room Name"
        />
        <footer className="w-full flex justify-between items-center">
          <Button onClick={() => navigate("/")}>Back</Button>
          <Button type="submit">Enter</Button>
        </footer>
      </Form>
    </div>
  );
};

export default ChatroomErrorBoundary;
