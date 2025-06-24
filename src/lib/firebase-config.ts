
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCzI1usH2GAsiff2s9lku9YGJ-8eNoNcpc",
  authDomain: "nitisetu-auth.firebaseapp.com",
  projectId: "nitisetu-auth",
  storageBucket: "nitisetu-auth.firebasestorage.app",
  messagingSenderId: "315102801814",
  appId: "1:315102801814:web:704a525f0ec68d360837b7",
  measurementId: "G-84CPZKH0W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;
