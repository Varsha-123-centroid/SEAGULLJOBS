// src/components/PhoneAuth.js

import React, { useState, useEffect } from "react";
import { auth } from "./firebase.config"; // Import firebase configuration
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
//import { setupRecaptcha } from "./recaptcha"; // Import setupRecaptcha

function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const auth = getAuth(); // Initialize Firebase authentication
  
//console.log(auth.currentUser);
  // Function to send OTP
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             console.log("Recaptcha verified");
//           },
//         },
//         auth
//       );
//     }
//   };
  
//   const sendOtp = async(phoneNumber) => {
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
  
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         console.log("OTP sent");
//       })
//       .catch((error) => {
//         console.error("Error during sign-in with phone number:", error);
//       });
//   };
/*
const initRecaptcha = () => {
  if (!recaptchaVerifier) {  // Initialize only if not already initialized
   const verifier = new RecaptchaVerifier(auth,'recaptcha', {
      size: "invisible", // Set to 'invisible' if you want a hidden reCAPTCHA
      callback: (response) => {
        console.log("Recaptcha verified");
      },
      'expired-callback': () => {
        console.log("Recaptcha expired");
        recaptchaVerifier.reset(); // Reset if expired to allow re-rendering
      },
    }); // Ensure 'auth' is the third parameter
    //alert(recaptchaVerifier);
    setRecaptchaVerifier(verifier); 
  }
};*/
useEffect(() => {
  if (!recaptchaVerifier) {
    const verifier = new RecaptchaVerifier(auth,
      "recaptcha", // The HTML ID of the element to render the reCAPTCHA
      {
        size: "invisible", // Use 'invisible' for hidden reCAPTCHA
        callback: (response) => {
          console.log("Recaptcha verified");
        },
        "expired-callback": () => {
          console.log("Recaptcha expired");
        },
      },
      
    );
    verifier.render(); // Explicitly render the reCAPTCHA
    setRecaptchaVerifier(verifier); // Save the verifier for use later
  }
}, [recaptchaVerifier, auth]);
// Function to format and validate phone number
const formatPhoneNumber = (phone1) => {
//const phone1 =phoneno.toString();
//alert(phone1);
  if (typeof phone1 !== 'string' || phone1.trim() === '') { // Ensure phone1 is a non-empty string
    throw new Error('Phone number must be a non-empty string.');
  }

  const phoneNumber = parsePhoneNumberFromString(phone1); // Automatically detects country from the number
  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.format('E.164'); // Returns phone number in E.164 format
  } else {
    throw new Error('Invalid phone number format.');
  }
};

const sendOtp = async (phone1, retryCount = 0) => {
//  console.log("testtttttt"+JSON.parse(phone1));
//alert(phone1);
  try {
    if (!recaptchaVerifier) {
      throw new Error("Recaptcha verifier is not initialized.");
    }  
    console.log(phone1);
    // Validate and format phone number
    const formattedPhoneNumber ='+91'+phone1;// formatPhoneNumber(phone1);
console.log("...."+formattedPhoneNumber);
    // Send OTP to the validated phone number
    let confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
    console.log("...."+formattedPhoneNumber);
    // Save the confirmation result for later use (e.g., in a state or context)
    console.log("OTP Sent Successfully. Confirmation Result:", confirmationResult);
    // Use confirmationResult.confirm(otp) to verify the OTP entered by the user

  } catch (err) {
    console.error("Error sending OTP:", err.message || err);
    if (retryCount < 3 && err.code === 'auth/too-many-requests') {
      // Retry after a delay
      setTimeout(() => sendOtp(phone1, retryCount + 1), 5000);
    }
  }
};
  const verifyOtp = async() => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log("User signed in successfully:", user);
        console.log(auth.currentUser); // Should now show the user details
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div>
      <h2>Phone Number Authentication</h2>
      {/* <div id="recaptcha-container"></div> */} 
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={() => sendOtp(phone)}>Send OTP</button>
      <div id="recaptcha"></div>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}

export default PhoneAuth;
