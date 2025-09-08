import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Auth and Provider
import { getAnalytics } from "firebase/analytics"; // Import Analytics
import { getStorage } from "firebase/storage"; // Import Storage


const firebaseConfig = {
  apiKey: "AIzaSyDk8SnFmYN2vuUT_KxiHtaZvdSR5DE5EfA",
  authDomain: "dineyplus-clone-da41d.firebaseapp.com",
  projectId: "dineyplus-clone-da41d",
  storageBucket: "dineyplus-clone-da41d.firebasestorage.app",
  messagingSenderId: "730033084924",
  appId: "1:730033084924:web:bfcb7aac502179eb31ba79",
  measurementId: "G-HJPP0ST7V3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp); 
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(); 
const analytics = getAnalytics(firebaseApp); 
const storage = getStorage(firebaseApp); 

export { auth, provider, analytics, storage };
export default db;
