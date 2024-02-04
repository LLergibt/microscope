import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export const db = getFirestore(app);
