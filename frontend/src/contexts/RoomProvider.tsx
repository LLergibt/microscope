import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import type { JSX, Component, Accessor, Setter } from "solid-js";
import { useParams } from "@solidjs/router";
import { useUser } from "@/contexts/UserProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
type RoomContextType = {
  isOwner: Accessor<boolean>;
  roomUid: string;
  setVideo: Setter<HTMLVideoElement | undefined>;
  video: Accessor<HTMLVideoElement | undefined>;
};
const RoomContext = createContext<RoomContextType>();
const RoomProvider: Component<{ children: JSX.Element }> = (props) => {
  const [video, setVideo] = createSignal<HTMLVideoElement>();
  const { user } = useUser();
  const [isOwner, setIsOwner] = createSignal(false);
  const { roomUid } = useParams();

  const getIsOwner = async () => {
    const microscopeDoc = doc(db, "rooms", roomUid);
    const microscope = await getDoc(microscopeDoc);
    const isOwner: boolean = microscope.data()?.owners.includes(user()?.uid);
    return isOwner;
  };

  const handleOwner = async () => {
    setIsOwner(await getIsOwner());
  };

  createEffect(() => {
    if (user()) {
      handleOwner();
    }
  });

  return (
    <RoomContext.Provider value={{ isOwner, roomUid, video, setVideo }}>
      {props.children}
    </RoomContext.Provider>
  );
};
export const useRoomLogic = () => useContext(RoomContext) as RoomContextType;
export default RoomProvider;
