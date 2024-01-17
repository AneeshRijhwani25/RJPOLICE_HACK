// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCspCm7uSWnXQmgnwYa38DiLetdnydFWIQ",
  authDomain: "authapp-63c93.firebaseapp.com",
  projectId: "authapp-63c93",
  storageBucket: "authapp-63c93.appspot.com",
  messagingSenderId: "395126792071",
  appId: "1:395126792071:web:ce2ac72ecde61e940e7d22",
  measurementId: "G-8CQ16RTSJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
