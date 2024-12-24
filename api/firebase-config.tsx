import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage"; // k,mlik dogrulamayı kalıcı hale getirmek içinr

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
const FIREBASE_APP = initializeApp(firebaseConfig);

// Export Firebase services
// export const auth = getAuth(app); //auth değişkeni, Firebase Authentication servisini temsil eder. Uygulamanızda kullanıcı oturumu açma, kayıt olma, şifre sıfırlama ve oturum yönetimi gibi işlemleri gerçekleştirmek için kullanılır.

// export const firestore = getFirestore(app); //firestore değişkeni, Firebase'in NoSQL bir bulut veritabanı olan Firestore'u temsil eder. Kullanıcılarınızın veya uygulamanızın ihtiyaç duyduğu verileri saklamak ve bu verilere erişmek için kullanılır.
// export const storage = getStorage(app); //storage değişkeni, Firebase Storage'ı temsil eder. Uygulamanızda resim, video veya diğer dosyaları saklamak ve bu dosyalara erişmek için kullanılır.

export { FIREBASE_APP };
