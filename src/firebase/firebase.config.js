// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeC_-EgISl3GPAIlN5AmWgEWB1ZxBHx-w",
    authDomain: "ticket-bari-c52a6.firebaseapp.com",
    projectId: "ticket-bari-c52a6",
    storageBucket: "ticket-bari-c52a6.firebasestorage.app",
    messagingSenderId: "605772565860",
    appId: "1:605772565860:web:8e9fc8286bd33b983e3e71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
