// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2kLco6C9LBKwkFkmPnNws23xmx6kmaAs",
  authDomain: "shop-zone-26ae9.firebaseapp.com",
  projectId: "shop-zone-26ae9",
  storageBucket: "shop-zone-26ae9.firebasestorage.app",
  messagingSenderId: "914240024270",
  appId: "1:914240024270:web:6c24597724281269e72a9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);