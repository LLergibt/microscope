import type { JSX, Component } from "solid-js";
import { Show, createSignal, createEffect } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import { useStreaming } from "@hooks/stream/useStreaming";
import { useParams } from "@solidjs/router";
import ChatRoom from "@components/ChatRoom/index";

const Translater: Component = () => {
  let video;
  const context = useUser();
  const login = context?.login;
  const user = context?.user;
  const getIsOwner = context?.getIsOwner;
  const [isOwner, setIsOwner] = createSignal();
  const { roomUid } = useParams();
  const handleOwner = async () => setIsOwner(await getIsOwner(roomUid));

  createEffect(() => {
    if (user && user()) {
      handleOwner();
    }
  });

  const { handleStreaming, isStreaming } = useStreaming(roomUid);

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
              class={`ml-8 w-1/2 mt-2  ${
                !login() && "w-4/5 mt-0 self-center"
              } h-auto   `}
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
