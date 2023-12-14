import { useUser } from "@contexts/UserProvider";
import { useMessages } from "@hooks/useMessages";
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
    <div class="mb-8" ref={containerRef}>
      <ul class="h-full flex flex-col items-start justify-items-start">
        {messages().map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user().uid} />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
