import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ChatRoom(props) {
  // ...
  return (
    <>
      <Card class="overflow-y-auto flex flex-col justify-between mt-1 px-3 py-2 min-w-[23rem] h-[50rem]">
        <MessageList roomId={props.roomUid} />
        <MessageInput roomId={props.roomUid} />
      </Card>
    </>
  );
}
export default ChatRoom;
