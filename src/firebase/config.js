// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPyfZjiqCahJFBDU5LN9DWXuY-13Kb6oI",
  authDomain: "listtta-9f91b.firebaseapp.com",
  projectId: "listtta-9f91b",
  storageBucket: "listtta-9f91b.firebasestorage.app",
  messagingSenderId: "592357821349",
  appId: "1:592357821349:web:419df20490d792e606364c",
  measurementId: "G-0TQ08X19SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);