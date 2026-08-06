import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_E3b_Q8qepiGaGFE1igNJiyvm--XWEDU",
  authDomain: "heart-in-crumbles.firebaseapp.com",
  projectId: "heart-in-crumbles",
  storageBucket: "heart-in-crumbles.firebasestorage.app",
  messagingSenderId: "217176740206",
  appId: "1:217176740206:web:7742a86b8442c81915f17f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
