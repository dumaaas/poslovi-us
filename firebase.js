// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Xo6my6_Odsey1on8mfL5Jvfz9s_M60s",
  authDomain: "poslovi-us.firebaseapp.com",
  projectId: "poslovi-us",
  storageBucket: "poslovi-us.appspot.com",
  messagingSenderId: "599604615193",
  appId: "1:599604615193:web:0945ff0121932d0908f288",
  measurementId: "G-25YDLXJPDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {auth, db}