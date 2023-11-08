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
      <div class="w-screen my-20 flex justify-center text-xl">
        <div>
          <Show when={login && login()}>
            <button class="bg-red-200" onClick={handleStreaming}>
              {isStreaming() ? "stop" : "start"}
            </button>
          </Show>
        </div>

        <div class="h-screen w-f">
          <video
            class="h-full w-3/4"
            id="video"
            ref={video}
            width="1000"
            height="600"
            autoPlay
            muted
          />
        </div>
      </div>
    </>
  );
};
export default Translater;
