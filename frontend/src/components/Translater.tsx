import type { JSX, Component } from "solid-js";
import { Show, createSignal, createEffect } from "solid-js";
import { useUser } from "@/contexts/UserProvider";
import { useRoomLogic } from "@/contexts/RoomProvider";
import { useStreaming } from "@/hooks/stream/useStreaming";
import { useMovement } from "@/hooks/useMovement";
import { useParams } from "@solidjs/router";
import ChatRoom from "@/components/ChatRoom/index";

const Translater: Component = () => {
  let video;
  const context = useUser();
  const login = context?.login;
  const { isOwner, roomUid } = useRoomLogic();

  const {
    handleStreaming,
    isStreaming,
    sendOtherMessage,
    sendMessage,
    sendMessage1,
  } = useStreaming(roomUid);
  useMovement();

  return (
    <>
      <Show when={login()}>
        <div class="flex w-screen">
          <div class="w-4/5  h-full mt-8 flex  flex-col text-xl">
            <div>
              <Show when={isOwner()}>
                <button
                  class="rounded  text-center w-32  ml-8 h-8 text-white hover:text-gray-300  bg-black    border border-gray-300"
                  onClick={handleStreaming}
                >
                  {isStreaming() ? "stop" : "start"}
                </button>
              </Show>
            </div>

            <video
              class={"w-4/5 mt-0 self-center h-auto   "}
              id="video"
              ref={video}
              autoPlay
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
