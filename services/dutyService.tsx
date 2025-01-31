// import { collection, addDoc, doc, setDoc, Firestore } from "firebase/firestore"; //addDoc: Bir koleksiyona yeni bir belge (document) eklemek için kullanılan bir fonksiyondur.
// import { db } from "../api/firebase-config";

// export const addDutyToRoom = async (userId: string, dutyData: object) => {
//   try {
//     const dutiesCollection = collection(db, "users", userId, "duties"); //İlk parametre db: Firestore veritabanını temsil eder.
//     //İkinci parametre "rooms": Firestore'da odaları temsil eden koleksiyon adı.
//     //Üçüncü parametre roomId: Hangi odanın (belgenin) hedeflendiğini belirtir.
//     //Dördüncü parametre "duties": Bu odanın içindeki görevleri temsil eden alt koleksiyon
//     const dutyRef = await addDoc(dutiesCollection, dutyData); // addDoc Görev bilgilerini (dutyData) belirtilen koleksiyona ekler
//     return dutyRef.id; //Firestore'da eklenen görevin benzersiz ID'si.
//   } catch (error) {
//     throw error;
//   }
// };

import { collection, addDoc, doc, setDoc, Firestore } from "firebase/firestore";
import { db } from "../api/firebase-config";

// Görev verisini farklı kategorilerde (daily, weekly, monthly) kategorize ederek ekleme fonksiyonu
export const addDutyToRoom = async (
  userId: string,
  dutyData: { daily: object[]; weekly: object[]; monthly: object[] }
) => {
  try {
    // Kullanıcının görev koleksiyonunu alıyoruz
    const dutiesCollection = collection(db, "users", userId, "duties");

    // Günlük görevler (daily)
    const dailyRef = await addDoc(dutiesCollection, {
      type: "daily",
      duties: dutyData.daily,
    });

    // Haftalık görevler (weekly)
    const weeklyRef = await addDoc(dutiesCollection, {
      type: "weekly",
      duties: dutyData.weekly,
    });

    // Aylık görevler (monthly)
    const monthlyRef = await addDoc(dutiesCollection, {
      type: "monthly",
      duties: dutyData.monthly,
    });

    // Görevlerin başarıyla eklenip eklenmediği bilgisini döndürüyoruz
    return {
      dailyRefId: dailyRef.id,
      weeklyRefId: weeklyRef.id,
      monthlyRefId: monthlyRef.id,
    };
  } catch (error) {
    throw error;
  }
};
