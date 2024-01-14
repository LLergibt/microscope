import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function ChatRoom(props) {
  // ...
  return (
    <>
      <div class="border">
        <MessageList roomId={props.roomUid} />
        <MessageInput roomId={props.roomUid} />
      </div>
    </>
  );
}
export default ChatRoom;
