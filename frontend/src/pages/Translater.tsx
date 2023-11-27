import type { JSX, Component } from "solid-js";
import { Show } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import { useStreaming } from "@hooks/stream/useStreaming";

const Translater: Component = () => {
  let video;
  const context = useUser();
  const login = context?.login;
  const { handleStreaming, isStreaming } = useStreaming();

  return (
    <>
      <div class="w-full  h-full mt-8 flex  flex-col text-xl">
        <div>
          <Show when={login && login()}>
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
            !login() && "w-3/5 mt-0 self-center"
          } h-auto   `}
          id="video"
          ref={video}
          autoPlay
          muted
        />
      </div>
    </>
  );
};
export default Translater;
