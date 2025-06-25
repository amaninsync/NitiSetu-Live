// src/lib/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (using the provided values)
// NOTE: In a Canvas environment, __firebase_config and __app_id are provided globally.
// We'll use these if available, otherwise fall back to the provided config.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
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

export default app;
