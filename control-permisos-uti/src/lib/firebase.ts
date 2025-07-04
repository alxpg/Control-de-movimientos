import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJDK9ImtmUmxWdx56RO_dfIoioq3pIN0Y",
  authDomain: "sicom-a375e.firebaseapp.com",
  projectId: "sicom-a375e",
  storageBucket: "sicom-a375e.firebasestorage.app",
  messagingSenderId: "322436830470",
  appId: "1:322436830470:web:773ac112e49e140a4afa87",
  measurementId: "G-YT5XRVD6JT"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);