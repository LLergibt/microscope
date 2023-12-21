import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatRoom() {
  // ...
  return (
    <>
      <div class="border">
        <MessageList roomId={"1"} />
        <MessageInput roomId={"1"} />
      </div>
    </>
  );
}
export default ChatRoom;
