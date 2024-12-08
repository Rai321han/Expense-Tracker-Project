/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD58MurwFClF442Hp9YSsf31GWgS6edH30",
  authDomain: "expense-tracker-c8a4a.firebaseapp.com",
  projectId: "expense-tracker-c8a4a",
  storageBucket: "expense-tracker-c8a4a.firebasestorage.app",
  messagingSenderId: "930404486667",
  appId: "1:930404486667:web:4395fd1dc6e7d1af95410e",
  measurementId: "G-CHGRXX9QKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
