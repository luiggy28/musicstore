import MOCK_DATA from './data.json' assert { type: 'json'}

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAEV2QucAdud2cPcB5HX58V7Fz7ZH3brPs",
    authDomain: "luiggy-reactjs.firebaseapp.com",
    projectId: "luiggy-reactjs",
    storageBucket: "luiggy-reactjs.appspot.com",
    messagingSenderId: "591710535719",
    appId: "1:591710535719:web:dfe9a92fcc2e1b83cd8e02"
    };


const app = initializeApp(firebaseConfig);
const db = getFirestore( app )

const productosRef = collection(db, 'productos')

MOCK_DATA.forEach(item => {
    delete item.id
    addDoc(productosRef, item)
})