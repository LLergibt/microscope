import { createEffect, createSignal, onMount } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import { db } from "@services/firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { start, stop } from "./NegotiateUtils";
import axios from "axios";
export const useStreaming = () => {
  const context = useUser();
  const token = context?.token;
  const user = context?.user;
  const [isStreaming, setIsStreaming] = createSignal();
  const isStreamingApi = async () => {
    const microscopeDoc = doc(db, "microscope_config", "1");
    const microscope = await getDoc(microscopeDoc);
    return microscope.data().is_streaming;
  };
  const isStreamingApiChange = async () => {
    const microscopeDoc = doc(db, "microscope_config", "1");
    const microscope = await getDoc(microscopeDoc);
    console.log(microscope.data().is_streaming);

    await updateDoc(microscopeDoc, {
      is_streaming: !microscope.data().is_streaming,
    });
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
  return { handleStreaming, isStreaming };
};
