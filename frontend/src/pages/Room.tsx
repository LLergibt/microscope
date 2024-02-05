import type { Component } from "solid-js";
import Translater from "@/components/Room/Translater";
import ChatRoom from "@/components/ChatRoom/index";
import RoomProvider from "@/contexts/RoomProvider";
import Footer from "@/components/Room/Footer/Index";
import { Show } from "solid-js";
import { useUser } from "@/contexts/UserProvider";

const Room: Component = () => {
  const { login } = useUser();
  return (
    <>
      <RoomProvider>
        <Show when={login()}>
          <div class="flex w-screen h-full">
            <Translater />
            <ChatRoom />
          </div>
          <Footer />
        </Show>
      </RoomProvider>
    </>
  );
};
export default Room;
