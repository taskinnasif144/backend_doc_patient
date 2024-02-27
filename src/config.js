// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKzdvCisfoU35jittjfr8dlgJlQuTcmjA",
  authDomain: "docpatient-530f3.firebaseapp.com",
  databaseURL:
    "https://docpatient-530f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "docpatient-530f3",
  storageBucket: "docpatient-530f3.appspot.com",
  messagingSenderId: "1056935425361",
  appId: "1:1056935425361:web:d0119646fec7ff57104f70",
  measurementId: "G-0YNFRMGY8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
