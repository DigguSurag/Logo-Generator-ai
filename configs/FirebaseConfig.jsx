// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "logo-generator-5abc5.firebaseapp.com",
  projectId: "logo-generator-5abc5",
  storageBucket: "logo-generator-5abc5.firebasestorage.app",
  messagingSenderId: "604742968657",
  appId: "1:604742968657:web:b2eb9ffc26b1f41310df70",
  measurementId: "G-12DQVSKWJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);