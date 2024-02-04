import { useUser } from "@/contexts/UserProvider";
import { Messages, Message as MessageType } from "@/hooks/useMessages";
import { Accessor } from "solid-js";
import Message from "./Message";

const MessageList = (props: { messages: Accessor<Messages | null> }) => {
  const { user } = useUser();

  return (
    <div>
      <ul class="h-full  flex flex-col justify-center">
        {props
          .messages()
          ?.map((message: MessageType) => (
            <Message
              message={message}
              isOwnMessage={message.uid === user()?.uid}
            />
          ))}
      </ul>
    </div>
  );
};

export default MessageList;
