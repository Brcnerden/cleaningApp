import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Kimlik doğrulama bilgisini saklamak için

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBZARj5Mx61iP_IVv5u0ZYvGS1zFlfFGyk",
  authDomain: "cleaningapp-918ce.firebaseapp.com",
  projectId: "cleaningapp-918ce",
  storageBucket: "cleaningapp-918ce.appspot.com",
  messagingSenderId: "825991865441",
  appId: "1:825991865441:web:16e0e58d422eb30aecf620",
  measurementId: "G-FSFQWJE4MW",
};

// Firebase uygulamasını başlat
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase servislerini başlat
const FIREBASE_APP = initializeApp(firebaseConfig);
const db = getFirestore(FIREBASE_APP); // Firestore için
const auth = getAuth(FIREBASE_APP); // Authentication için

// Kimlik doğrulama durumu değişikliklerini dinle ve AsyncStorage ile sakla
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Kullanıcı oturum açmışsa UID'yi sakla
    await AsyncStorage.setItem("userToken", user.uid);
  } else {
    // Kullanıcı çıkış yapmışsa UID'yi kaldır
    await AsyncStorage.removeItem("userToken");
  }
});

// Firebase servislerini dışa aktar
export { FIREBASE_APP, db, auth };
