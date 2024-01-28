import type { Component } from "solid-js";
import Translater from "@/components/Translater";
import RoomProvider from "@/contexts/RoomProvider";

const Room: Component = () => {
  return (
    <>
      <RoomProvider>
        <Translater />
      </RoomProvider>
    </>
  );
};
export default Room;
