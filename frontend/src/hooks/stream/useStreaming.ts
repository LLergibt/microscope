import { createEffect, createSignal, onMount } from "solid-js";
import { useUser } from "@contexts/UserProvider";
import { start, stop } from "./NegotiateUtils";
import axios from "axios";
export const useStreaming = () => {
  const context = useUser();
  const token = context?.token;
  const [isStreaming, setIsStreaming] = createSignal();
  const isStreamingApi = async () => {
    const response = await axios.get(
      "http://localhost:8000/webcam/translation/"
    );
    return response.data.is_streaming;
  };
  const isStreamingApiChange = async () => {
    const response = await fetch("http://localhost:8000/webcam/translation", {
      headers: { Authorization: `Bearer ${token()}` },
      method: "POST",
    });
    return response.json();
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
