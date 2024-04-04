// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};
