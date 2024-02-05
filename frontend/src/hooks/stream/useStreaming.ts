import { createSignal, onMount, Setter } from "solid-js";
import { useUser } from "@/contexts/UserProvider";
import { db } from "@/services/firebase";
import { getDoc, doc } from "firebase/firestore";
import { connect, disconnect } from "./NegotiateUtils";
import axios from "axios";
export const useStreaming = (
  roomUid: string,
  setVideo: Setter<HTMLVideoElement | undefined>
) => {
  const context = useUser();
  const user = context?.user;
  const [isStreaming, setIsStreaming] = createSignal();
  const isStreamingApi = async () => {
    const microscopeDoc = doc(db, "rooms", roomUid);
    const microscope = await getDoc(microscopeDoc);
    if (microscope) {
      return microscope.data()?.microscope_config.is_streaming;
    }
  };
  const isStreamingApiChange = async () => {
    if (user) {
      const tokenId = await user()?.getIdToken();
      await axios.post(
        `${
          import.meta.env.VITE_FIRESTORE_API_BASE_URL
        }/rooms/stream/?room_uid=${roomUid}`,
        {},
        { headers: { Authorization: tokenId } }
      );
    }
  };
  const handleStreaming = async () => {
    isStreaming() ? disconnect(setVideo) : connect(setVideo);

    setIsStreaming((prev) => !prev);
    await isStreamingApiChange();
  };

  onMount(async () => {
    const isStreamingRaw = await isStreamingApi();
    setIsStreaming(isStreamingRaw);
    if (isStreamingRaw) {
      connect(setVideo);
    }
  });
  return {
    handleStreaming,
    isStreaming,
  };
};
