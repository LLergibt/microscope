import { createEffect, createSignal, onMount } from "solid-js";
import { useUser } from "@/contexts/UserProvider";
import { db } from "@/services/firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { start, stop } from "./NegotiateUtils";
import axios from "axios";
export const useStreaming = (roomUid: string) => {
  const context = useUser();
  const user = context?.user;
  const [isStreaming, setIsStreaming] = createSignal();
  const isStreamingApi = async () => {
    const microscopeDoc = doc(db, "rooms", roomUid);
    const microscope = await getDoc(microscopeDoc);
    return microscope.data().microscope_config.is_streaming;
  };
  const isStreamingApiChange = async () => {
    const tokenId = await user().getIdToken();
    await axios.post(
      `${
        import.meta.env.VITE_FIRESTORE_API_BASE_URL
      }/rooms/stream/?room_uid=${roomUid}`,
      {},
      { headers: { Authorization: tokenId } }
    );
  };
  const handleStreaming = async () => {
    setIsStreaming((prev) => !prev);
    await isStreamingApiChange();
  };

  onMount(async () => {
    const isStreamingRaw = await isStreamingApi();
    setIsStreaming(isStreamingRaw);
  });
  createEffect(() => {
    isStreaming() ? start() : stop();
  });
  return {
    handleStreaming,
    isStreaming,
  };
};
