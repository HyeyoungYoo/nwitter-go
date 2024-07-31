import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiCK8Gc8-5UwpDunnyRPVLdrckDkIY4pg",
  authDomain: "nwitter-go.firebaseapp.com",
  projectId: "nwitter-go",
  storageBucket: "nwitter-go.appspot.com",
  messagingSenderId: "7358801775",
  appId: "1:7358801775:web:99168eb82554063435aa9a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);