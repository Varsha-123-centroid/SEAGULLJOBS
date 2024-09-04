// src/firebase/recaptcha.js

import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase"; // Import your Firebase configuration

export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
        },
      },
      auth // Ensure 'auth' is correctly passed here
    );
  }
};
