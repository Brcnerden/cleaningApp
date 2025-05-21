import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Firebase uygulamasını başlat
const FIREBASE_APP = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Firestore ve Auth servisleri
const db = getFirestore(FIREBASE_APP);
const auth = getAuth(FIREBASE_APP);

// Kimlik doğrulama durumunu dinle ve AsyncStorage ile sakla
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await AsyncStorage.setItem("userToken", user.uid);
  } else {
    await AsyncStorage.removeItem("userToken");
  }
});

export { FIREBASE_APP, db, auth };
