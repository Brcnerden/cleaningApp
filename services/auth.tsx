import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

import { FIREBASE_APP, auth } from "../api/firebase-config";

interface AuthCallback {
  (user: User | null): void; // onAuthStateChanged geri çağırma fonksiyonu
}

// geriye dönüşte data.user kontrol edilecek var ise devam, yok ise hataya düşer hatayı ekrana error.message olarak basabilirsin.
const createAuth = async (
  email: string,
  password: string
): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

// geriye dönüşte data.user kontrol edilecek var ise devam, yok ise hataya düşer hatayı ekrana error.message olarak basabilirsin.
const signInUser = async (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

const isUserSingIn = async (callback: AuthCallback) =>
  onAuthStateChanged(auth, callback); //kullanıcının giriş yapıp yapmadığını kontrol eder.

const userSingOut = async (): Promise<void> => signOut(auth);

export { createAuth, signInUser, isUserSingIn, userSingOut };
