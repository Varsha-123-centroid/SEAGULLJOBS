// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaDxgsTU--ONkGLviMKJuwr1xC0GPif_Q",
  authDomain: "seagullotp-976f1.firebaseapp.com",
  projectId: "seagullotp-976f1",
  storageBucket: "seagullotp-976f1.appspot.com",
  messagingSenderId: "987737060494",
  appId: "1:987737060494:web:aa1f967866d2e7838d45df",
  measurementId: "G-DB64LWZV8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//auth.appVerificationDisabledForTesting = true;
