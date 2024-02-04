import { Setter, Accessor } from "solid-js";
import { User } from "firebase/auth";
import { createSignal, createEffect } from "solid-js";
import {
  collection,
  addDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/services/firebase";

export type Message = {
  id: string;
  uid: string;
  displayName: string;
  text: string;
  timestamp: Date;
};
export type Messages = Message[];

function useMessages(roomId: string) {
  const [messages, setMessages] = createSignal<Messages | null>([]);
  const sendMessage = async (user: Accessor<User>, text: Accessor<string>) => {
    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        uid: user().uid,
        displayName: user().displayName,
        text: text(),
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async (
    roomId: string,
    callback: Setter<Messages | null>
  ) => {
    return onSnapshot(
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const messages: Messages = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            id: doc.id,
            uid: doc.data().uid,
            timestamp: doc.data().timestamp,
            displayName: doc.data().displayName,
            text: doc.data().text,
          })
        );
        callback(messages);
      }
    );
  };

  createEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  });

  return { messages, sendMessage };
}

export { useMessages };
