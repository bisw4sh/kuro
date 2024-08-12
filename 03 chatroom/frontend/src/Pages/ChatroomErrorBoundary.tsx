import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, redirect, useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const formAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  try {
    const res = await fetch(`/api/room/${formData.get("roomNumber")}`);
    const responseData = await res.json();
    if (!res.ok) redirect(".");
    if (responseData?.exist) return redirect(`./${formData.get("roomNumber")}`);
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
        <Label htmlFor="roomNumber" className="self-start">
          Type Room number to enter
        </Label>
        <Input
          type="text"
          id="roomNumber"
          name="roomNumber"
          placeholder="Room Number"
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
