// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXWjaiWZjm94dfiDnvCtmvQRCDKJ7lzbY",
  authDomain: "cockroach-poker.firebaseapp.com",
  projectId: "cockroach-poker",
  storageBucket: "cockroach-poker.appspot.com",
  messagingSenderId: "876384301378",
  appId: "1:876384301378:web:0b5cde9a54debd768398db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();