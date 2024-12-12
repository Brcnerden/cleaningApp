import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Auth'u ekledik
import { getFirestore } from "firebase/firestore"; // Firestore ekledik
import { getStorage } from "firebase/storage"; // Storage için ekledik

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZARj5Mx61iP_IVv5u0ZYvGS1zFlfFGyk",
  authDomain: "cleaningapp-918ce.firebaseapp.com",
  projectId: "cleaningapp-918ce",
  storageBucket: "cleaningapp-918ce.appspot.com",
  messagingSenderId: "825991865441",
  appId: "1:825991865441:web:16e0e58d422eb30aecf620",
  measurementId: "G-FSFQWJE4MW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
