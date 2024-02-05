import type { Component } from "solid-js";
import { Show, createSignal, createEffect } from "solid-js";
import { useRoomLogic } from "@/contexts/RoomProvider";
import { useStreaming } from "@/hooks/stream/useStreaming";
import { useMovement } from "@/hooks/useMovement";
import { Button } from "@/components/ui/button";

const Translater: Component = () => {
  const { roomUid, video, setVideo } = useRoomLogic();
  createEffect(() => {
    console.log(video());
  });

  useMovement();

  return (
    <>
      <div class="w-4/5 flex">
        <video
          class={"w-4/6  ml-8 self-center h-full"}
          id="video"
          ref={setVideo}
          autoplay
          muted
        />
      </div>
    </>
  );
};
export default Translater;
