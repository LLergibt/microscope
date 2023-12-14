import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBW5dRcsggB-GteyAhjY8TXotc4uRGlbPA",
  authDomain: "microscope-49942.firebaseapp.com",
  projectId: "microscope-49942",
  storageBucket: "microscope-49942.appspot.com",
  messagingSenderId: "821597752838",
  appId: "1:821597752838:web:ba96a0a37f7a4cbc54fd87",
  measurementId: "G-3XF36V5BJJ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(auth.currentUser);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export const useFirestore = () => {
  const sendMessage = async (roomId, user, text) => {
    console.log(user());
    try {
      await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
        uid: user().uid,
        displayName: user().displayName,
        text: text(),
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getMessages = async (roomId, callback) => {
    return onSnapshot(
      query(
        collection(db, "chat-rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      }
    );
  };
  return { sendMessage, getMessages };
};
