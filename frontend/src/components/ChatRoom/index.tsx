import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { Card } from "@/components/ui/card";
import { useMessages } from "@/hooks/useMessages";

function ChatRoom(props: { roomUid: string }) {
  const { messages, sendMessage } = useMessages(props.roomUid);
  return (
    <>
      <Card class="overflow-y-auto flex flex-col justify-between mt-1 px-3 py-2 min-w-[23rem] h-[50rem]">
        <MessageList messages={messages} />
        <MessageInput sendMessage={sendMessage} />
      </Card>
    </>
  );
}
export default ChatRoom;
