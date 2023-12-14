import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatRoom() {
  // ...
  return (
    <>
      <div class="border mt-4 w-auto h-full rounded flex flex-col">
        <MessageList roomId={"1"} />
        <MessageInput roomId={"1"} />
      </div>
    </>
  );
}
export default ChatRoom;
