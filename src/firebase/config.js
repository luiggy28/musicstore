// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEV2QucAdud2cPcB5HX58V7Fz7ZH3brPs",
    authDomain: "luiggy-reactjs.firebaseapp.com",
    projectId: "luiggy-reactjs",
    storageBucket: "luiggy-reactjs.appspot.com",
    messagingSenderId: "591710535719",
    appId: "1:591710535719:web:dfe9a92fcc2e1b83cd8e02",
    measurementId: "G-1XTZNFSM8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()