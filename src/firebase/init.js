import { initializeApp } from 'firebase/app'

import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwM7B3otLQqSIDg3BkCUrnrlJJQ01a6HE",
  authDomain: "fit5032-538dc.firebaseapp.com",
  projectId: "fit5032-538dc",
  storageBucket: "fit5032-538dc.firebasestorage.app",
  messagingSenderId: "806468822159",
  appId: "1:806468822159:web:3c1a6b4db89151f524fcfa"
};

// Initialize Firebase
initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()

export default db