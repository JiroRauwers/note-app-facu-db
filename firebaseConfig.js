import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDyAQrfSEcQG_8fdXsDWqgHxcPfJtYzTkg",
    authDomain: "trab-db.firebaseapp.com",
    projectId: "trab-db",
    storageBucket: "trab-db.appspot.com",
    messagingSenderId: "908922837797",
    appId: "1:908922837797:web:5c935219ac7e2a4f8298cc",
    measurementId: "G-MFJW0C78S9"
  };


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);