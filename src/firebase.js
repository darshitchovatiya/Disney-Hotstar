import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBnry1cdZ2geUgR1w9oAhEE2gB20nveXtY",
    authDomain: "disneyplus-app-bb79c.firebaseapp.com",
    projectId: "disneyplus-app-bb79c",
    storageBucket: "disneyplus-app-bb79c.firebasestorage.app",
    messagingSenderId: "539495659114",
    appId: "1:539495659114:web:92b2b8fee75f4db40cfc13",
    measurementId: "G-0XGY4MWRKG"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebaseApp.auth.GoogleAuthProvider();
const analytics = getAnalytics(firebaseApp);
const storage = firebaseApp.storage();

export {  auth, provider, analytics, storage };
export default db;
