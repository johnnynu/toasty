// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  // Replaced hardcoded firebaseConfig values with .env variables for better security and configurability
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

/**
 * Signs the user in with a Google Popup
 * @returns A promise that resolves with the user's credentials
 */
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider());
};

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out
 */
export const signOut = async () => {
  return await auth.signOut();
};

/**
 * Trigger a callback when user auth state changes
 * @returns a function to unsubscribe callback
 */
export const onAuthStateChangedHelper = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};
