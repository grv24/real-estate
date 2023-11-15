// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY||"AIzaSyDshoxo16jBL4DPlp1kVlTu46EKc1SjgBk",
    authDomain: "mern-estate-5875a.firebaseapp.com",
    projectId: "mern-estate-5875a",
    storageBucket: "mern-estate-5875a.appspot.com",
    messagingSenderId: "553511535904",
    appId: "1:553511535904:web:1790709ad14955fd690345"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);