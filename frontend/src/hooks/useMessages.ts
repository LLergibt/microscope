import { useFirestore } from "@/services/firebase";
import { createSignal, createEffect } from "solid-js";

function useMessages(roomId: number) {
  const { getMessages } = useFirestore();
  const [messages, setMessages] = createSignal([]);

  createEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  });

  return messages;
}

export { useMessages };
