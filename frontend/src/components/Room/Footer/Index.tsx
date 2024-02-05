import GroupDropdown from "./GroupDropdown";
import { useRoomLogic } from "@/contexts/RoomProvider";
import { useStreaming } from "@/hooks/stream/useStreaming";
import { Show } from "solid-js";
import { Button } from "@/components/ui/button";
import { Component } from "solid-js";
const Footer: Component = () => {
  const { isOwner, roomUid, setVideo } = useRoomLogic();
  const { handleStreaming, isStreaming } = useStreaming(roomUid, setVideo);
  return (
    <>
      <div class="flex w-full">
        <GroupDropdown />
        <Show when={isOwner()}>
          <Button class="text-base self-center" onClick={handleStreaming}>
            {isStreaming() ? "Закончить трансляцию" : "Начать трансляцию"}
          </Button>
        </Show>
      </div>
    </>
  );
};
export default Footer;
