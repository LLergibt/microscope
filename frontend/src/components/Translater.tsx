import type { Component } from "solid-js";
import { Show, createSignal } from "solid-js";
import { useUser } from "@/contexts/UserProvider";
import { useRoomLogic } from "@/contexts/RoomProvider";
import { useStreaming } from "@/hooks/stream/useStreaming";
import { useMovement } from "@/hooks/useMovement";
import { Button } from "@/components/ui/button";
import ChatRoom from "@/components/ChatRoom/index";

const Translater: Component = () => {
  const [, setVideo] = createSignal<HTMLVideoElement>();
  const { login } = useUser();
  const { isOwner, roomUid } = useRoomLogic();

  const { handleStreaming, isStreaming } = useStreaming(roomUid, setVideo);
  useMovement();

  return (
    <>
      <Show when={login()}>
        <div class="flex w-screen h-full">
          <div class="w-4/5 flex">
            <Show when={isOwner()}>
              <Button
                size="lg"
                class=" mt-3 text-base"
                onClick={handleStreaming}
              >
                {isStreaming() ? "stop" : "start"}
              </Button>
            </Show>

            <video
              class={
                isStreaming() ? "w-4/6  ml-8 self-center h-full" : "hidden"
              }
              id="video"
              ref={setVideo}
              autoplay
              muted
            />
          </div>
          <ChatRoom roomUid={roomUid} />
        </div>
      </Show>
    </>
  );
};
export default Translater;
