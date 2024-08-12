import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function CardWithForm({ rooms }: { rooms: string[] }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return navigate(`/chatroom/${value}`);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Chat Rooms</CardTitle>
        <CardDescription>All available chat channels</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Active Room Names</Label>
              <Select defaultValue="" value={value} onValueChange={setValue}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {rooms?.map((room, idx) => (
                    <SelectItem value={room} key={idx}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/chatroom")}>
            Create
          </Button>
          <Button type="submit">Enter</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
