import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBxFz2n8sCzxxCLXHJSe1KDIqdH-lFggW4",
    authDomain: "fir-cd6bb.firebaseapp.com",
    projectId: "fir-cd6bb",
    storageBucket: "fir-cd6bb.appspot.com",
    messagingSenderId: "621981220168",
    appId: "1:621981220168:web:f0ecba11119eaf302bc77d",
    measurementId: "G-MESD9KK5YM"
  };
export const Firebase = initializeApp(firebaseConfig);

export const auth = getAuth(Firebase);

export const db = getFirestore(Firebase)
