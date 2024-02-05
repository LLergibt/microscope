import type { Component } from "solid-js";
import { useRoomLogic } from "@/contexts/RoomProvider";
import { useMovement } from "@/hooks/useMovement";

const Translater: Component = () => {
  const { setVideo } = useRoomLogic();

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
