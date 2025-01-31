// import { getFirestore } from "firebase/firestore"; //Firebase Firestore SDK'sından getFirestore fonksiyonunu içeri aktarıyoruz. Bu fonksiyon, Firebase veritabanına bağlanmamızı sağlar. Firestore, Firebase'in bulut tabanlı NoSQL veritabanıdır.

// import { FIREBASE_APP } from "../api/firebase-config";
// import { doc, setDoc } from "firebase/firestore";

// export interface UserData {
//   password: string;
//   email: string;
//   [key: string]: any; // Diğer dinamik kullanıcı bilgileri için, örneğin fotoğraf url'si gibi
// }

// const USERS = "users"; //USERS adında bir değişken tanımlıyoruz ve değeri "users" olarak ayarlıyoruz. Bu, kullanıcıların verilerinin saklanacağı Firestore koleksiyonunun adıdır.

// const db = getFirestore(FIREBASE_APP); //Firebase uygulaması ile veritabanına bağlantıyı kurmak için getFirestore fonksiyonunu çağırıyoruz. Bu fonksiyon, Firebase Firestore ile etkileşime geçmemizi sağlayan bir db (veritabanı) referansı döner.

// const createUser = async (uid: string, data: UserData) =>
//   setDoc(doc(db, USERS, uid), data);

// //uid: Kullanıcının benzersiz kimliğini temsil eder (muhtemelen Firebase Authentication ile elde edilen kullanıcı kimliği).
// //data: Kullanıcının verileri (ad, e-posta, vs.) olacaktır. Bu veriler, Firestore'a kaydedilecektir.
// //doc(db, USERS, uid): Veritabanındaki users koleksiyonunda, uid ile belirtilen benzersiz ID'ye sahip bir belgeyi temsil eder.
// //setDoc: Bu belgeye data objesini ekler veya mevcutsa günceller.

// export { createUser, db };
// // doc ve setDoc fonksiyonlarını Firebase Firestore SDK'sından içeri aktarıyoruz.
// //doc: Veritabanında bir belgeyi (document) temsil eder. Bu fonksiyon, belirli bir koleksiyon ve belge için bir referans oluşturur.
// //setDoc: Belirli bir belgeye veri ekler veya mevcut veriyi günceller.

import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { FIREBASE_APP } from "../api/firebase-config";

const db = getFirestore(FIREBASE_APP);

const createUser = async (uid: string, email: string, password: string) => {
  const userData = {
    email,
    password,
    duties: {
      daily: [],
      weekly: [],
      monthly: [],
    },
  };

  try {
    await setDoc(doc(db, "users", uid), userData);
    console.log("Kullanıcı başarıyla oluşturuldu!");
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata oluştu:", error);
  }
};

const addDutyToUser = async (
  userId: string,
  dutyType: "daily" | "weekly" | "monthly",
  dutyData: { date: string; roomId: string; roomName: string }
) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      [`duties.${dutyType}`]: arrayUnion(dutyData),
    });
    console.log(`${dutyType} görev başarıyla eklendi!`);
  } catch (error) {
    console.error("Görev eklenirken hata oluştu:", error);
  }
};

export { createUser, addDutyToUser };
