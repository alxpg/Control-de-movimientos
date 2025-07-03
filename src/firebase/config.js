import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJDK9ImtmUmxWdx56RO_dfIoioq3pIN0Y",
  authDomain: "sicom-a375e.firebaseapp.com",
  projectId: "sicom-a375e",
  storageBucket: "sicom-a375e.firebasestorage.app",
  messagingSenderId: "322436830470",
  appId: "1:322436830470:web:773ac112e49e140a4afa87",

};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);


// Obtener instancias de los servicios
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {n
  apiKey: "AIzaSyAJDK9ImtmUmxWdx56RO_dfIoioq3pIN0Y",
  authDomain: "sicom-a375e.firebaseapp.com",
  projectId: "sicom-a375e",
  storageBucket: "sicom-a375e.firebasestorage.app",
  messagingSenderId: "322436830470",
  appId: "1:322436830470:web:773ac112e49e140a4afa87",
  measurementId: "G-YT5XRVD6JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/