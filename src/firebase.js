import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuU4nNYWnNsWNLUXnLwkgts5fiZBMSVp0",
  authDomain: "gigs--consulting.firebaseapp.com",
  projectId: "gigs--consulting",
  storageBucket: "gigs--consulting.firebasestorage.app",
  messagingSenderId: "170953303361",
  appId: "1:170953303361:web:d2cb3d70316e25020b6dc0",
  measurementId: "G-CR7CDJW90H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const storage = getStorage(app);