// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8B5Zq6_URvs42zF0qD15L_s6tvrdjiYQ",
  authDomain: "pet-adoption-1ef1b.firebaseapp.com",
  projectId: "pet-adoption-1ef1b",
  storageBucket: "pet-adoption-1ef1b.firebasestorage.app",
  messagingSenderId: "175970342843",
  appId: "1:175970342843:web:04b7004d70d0e3a61d969e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);