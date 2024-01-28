import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor } from "solid-js";
import { useParams } from "@solidjs/router";
import { useUser } from "@/contexts/UserProvider";

const RoomContext = createContext<{
  isOwner: Accessor<boolean>;
  roomUid: string;
}>();
const RoomProvider: Component<{ children: JSX.Element }> = (props) => {
  const context = useUser();
  const user = context?.user;
  const getIsOwner = context?.getIsOwner;
  const [isOwner, setIsOwner] = createSignal(false);
  const { roomUid } = useParams();
  const handleOwner = async () => setIsOwner(await getIsOwner(roomUid));

  createEffect(() => {
    if (user && user()) {
      handleOwner();
    }
  });

  return (
    <RoomContext.Provider value={{ isOwner, roomUid }}>
      {props.children}
    </RoomContext.Provider>
  );
};
export const useRoomLogic = () => useContext(RoomContext);
export default RoomProvider;
