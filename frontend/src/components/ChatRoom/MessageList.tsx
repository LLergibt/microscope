import { useUser } from "@/contexts/UserProvider";
import { useMessages } from "@/hooks/useMessages";
import Message from "./Message";
import { createEffect } from "solid-js";

const MessageList = ({ roomId }) => {
  let containerRef;
  const { user } = useUser();
  const messages = useMessages(roomId);

  createEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div ref={containerRef}>
      <ul class="h-full flex flex-col justify-center">
        {messages().map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user().uid} />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
