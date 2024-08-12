import { useRef, useEffect, useState } from "react";
import { useParams, useLoaderData, Form, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { initSocket, getSocket, closeSocket } from "../utility/socket_service";
import { useAuth } from "@clerk/clerk-react";

// eslint-disable-next-line react-refresh/only-export-components
export const chat_data_loader = async () => {
  const res = await fetch("/api/messages");
  const res_data = await res.json();
  return res_data;
};

interface MessagesType {
  sender: string;
  message: string;
  room?: string;
  time?: string;
}

const Chatroom = () => {
  const { chatroomId } = useParams();
  const author = useAuth();
  const navigate = useNavigate();
  const loader_messages = useLoaderData() as MessagesType[];
  const [messages, setMessages] = useState([...loader_messages]);
  const [write, setWrite] = useState<string>("");
  const text_area_ref = useRef<HTMLFormElement | null>(null);
  const date = new Date();

  useEffect(() => {
    const socket = initSocket();

    const handleReceiveMsg = (data: string) => {
      const payload = JSON.parse(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: payload.message,
          sender: payload.sender,
          time: payload?.time,
        },
      ]);
    };

    socket.emit("join_room", chatroomId);
    socket.on("receive_message", handleReceiveMsg);

    return () => {
      socket.emit("leave_room", chatroomId);
      socket.off("receive_message");
    };
  }, [chatroomId]);

  useEffect(() => {
    const executeScroll = () => text_area_ref?.current?.scrollIntoView();
    executeScroll();
  }, [messages]);

  function handleWriteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!write) return;

    const socket = getSocket();
    if (socket) {
      socket.emit(
        "send_message",
        JSON.stringify({
          message: write,
          sender: author.userId,
          time: `${date.getHours()}:${date.getMinutes()}`,
          chatroomId,
        })
      );
      console.log(messages);
      setWrite("");
    } else {
      console.error("Socket is not initialized");
    }
  }

  const handleDisconnect = () => {
    const socket = getSocket();
    if (socket) socket.emit("leave_room", chatroomId);
    closeSocket();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <section className="w-full flex items-center justify-between p-3">
        <header>Chatroom {chatroomId}</header>
        <Button onClick={handleDisconnect}>Exit</Button>
      </section>

      <main className="lg:w-1/2 max-lg:w-full h-5/6 flex flex-col justify-center items-start gap-3">
        <ScrollArea className="h-[35rem] w-full rounded-md border p-3">
          {messages.map((msg, idx) => (
            <div key={`${msg.sender}-${msg.message}-${idx}`}>
              <aside className="flex justify-start items-center gap-2">
                <section className="flex justify-start items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/bisw4sh"
                      alt={`@${msg?.sender}`}
                    />
                    <AvatarFallback className="capitalize">
                      {msg.sender.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <Badge>
                    {msg?.time
                      ? msg?.time
                      : `${date.getHours() - 1}:${date.getMinutes() - 10}`}
                  </Badge>
                </section>

                <article className="text-wrap">{msg?.message}</article>
              </aside>
              <Separator className="my-2" />
            </div>
          ))}

          <Form
            className="grid w-full gap-2 mt-3"
            ref={text_area_ref}
            onSubmit={handleWriteSubmit}
          >
            <Textarea
              placeholder="Type your message here."
              value={write}
              onChange={(e) => setWrite(e.target.value)}
            />
            <Button type="submit">Send message</Button>
          </Form>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Chatroom;
