import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
      await addDoc(collection(db, "chat-rooms", "1", "messages"), {
        uid: user().uid,
        displayName: user().displayName,
        text: text(),
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return { sendMessage };
};
