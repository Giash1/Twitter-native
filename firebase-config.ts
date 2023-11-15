// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK01D1jfWyjrh4gni2JDcgV2Gqeu8s5Vc",
  authDomain: "iths-crossplatsform.firebaseapp.com",
  projectId: "iths-crossplatsform",
  storageBucket: "iths-crossplatsform.appspot.com",
  messagingSenderId: "936600640596",
  appId: "1:936600640596:web:60fc8a7124a4ebe183a1c1",
  measurementId: "G-GY724X6T0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
