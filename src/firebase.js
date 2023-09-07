// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOdw24JPAKQJqSUQWarSGJqrURm1TEIz4",
  authDomain: "react-firebase-app-d4e2b.firebaseapp.com",
  projectId: "react-firebase-app-d4e2b",
  storageBucket: "react-firebase-app-d4e2b.appspot.com",
  messagingSenderId: "1097472447097",
  appId: "1:1097472447097:web:c37ae0701238a5cff7baa8",
  measurementId: "G-HTFLPTRTHN"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
const analytics = getAnalytics(firebaseApp);