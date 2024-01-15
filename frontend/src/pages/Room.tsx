import type { JSX, Component } from "solid-js";
import { Show, createSignal, createEffect } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import Translater from "@components/Translater";
import RoomProvider from "@contexts/RoomProvider";
import { useStreaming } from "@hooks/stream/useStreaming";
import { useParams } from "@solidjs/router";
import ChatRoom from "@components/ChatRoom/index";

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
