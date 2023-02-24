import firebase from "firebase/compat/app";

import "firebase/compat/auth";
const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const app = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,

  authDomain: "pronotdf-1a802.firebaseapp.com",

  projectId: "pronotdf-1a802",

  storageBucket: "pronotdf-1a802.appspot.com",

  messagingSenderId: "219164640260",

  appId: "1:219164640260:web:6e46a4538de9bbf9eb6151",

  databaseURL:
    "https://pronotdf-1a802-default-rtdb.europe-west1.firebasedatabase.app",
});

export const auth = app.auth();

export default app;
