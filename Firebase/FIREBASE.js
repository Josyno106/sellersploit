import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAjF3sr2XSEb66KlCy6HEIktlI8XkcauBA",
  authDomain: "salesploit.firebaseapp.com",
  projectId: "salesploit",
  storageBucket: "salesploit.appspot.com",
  messagingSenderId: "690233614080",
  appId: "1:690233614080:web:58e129728d3976245a9de5",
  measurementId: "G-VHSRBT6KMK",
});

// Initialize Firebase and Firestore

export const auth = app.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
