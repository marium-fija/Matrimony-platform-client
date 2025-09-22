// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSzs9wDGbKfY4ga0yDVIGn9KIF-eCzixo",
  authDomain: "matrimony-platform-auth.firebaseapp.com",
  projectId: "matrimony-platform-auth",
  storageBucket: "matrimony-platform-auth.firebasestorage.app",
  messagingSenderId: "33443235327",
  appId: "1:33443235327:web:36418e10eab44677fd13ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);