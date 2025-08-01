import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6Z0qqhgRjSQUg1-yQ_ALq5mwLg20M1gw",
  authDomain: "mind-of-admin.firebaseapp.com",
  projectId: "mind-of-admin",
  storageBucket: "mind-of-admin.firebasestorage.app",
  messagingSenderId: "849998059247",
  appId: "1:849998059247:web:25084ec8b3d7f7f476ad1a",
  measurementId: "G-JBZNL4Q2TX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 