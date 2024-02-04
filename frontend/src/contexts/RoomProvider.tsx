import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor } from "solid-js";
import { useParams } from "@solidjs/router";
import { useUser } from "@/contexts/UserProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
type RoomContextType = {
  isOwner: Accessor<boolean>;
  roomUid: string;
};
const RoomContext = createContext<RoomContextType>();
const RoomProvider: Component<{ children: JSX.Element }> = (props) => {
  const { user } = useUser();
  const [isOwner, setIsOwner] = createSignal(false);
  const { roomUid } = useParams();

  const getIsOwner = async (roomUid: string) => {
    const microscopeDoc = doc(db, "rooms", roomUid);
    const microscope = await getDoc(microscopeDoc);
    const isOwner: boolean = microscope.data()?.owners.includes(user()?.uid);
    return isOwner;
  };

  const handleOwner = async () => {
    setIsOwner(await getIsOwner(roomUid));
  };

  createEffect(() => {
    if (user()) {
      handleOwner();
    }
  });

  return (
    <RoomContext.Provider value={{ isOwner, roomUid }}>
      {props.children}
    </RoomContext.Provider>
  );
};
export const useRoomLogic = () => useContext(RoomContext) as RoomContextType;
export default RoomProvider;
