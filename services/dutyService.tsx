import { collection, addDoc, doc, setDoc, Firestore } from "firebase/firestore"; //addDoc: Bir koleksiyona yeni bir belge (document) eklemek için kullanılan bir fonksiyondur.
import { db } from "../api/firebase-config";

export const addDutyToRoom = async (roomId: string, dutyData: object) => {
  try {
    const dutiesCollection = collection(db, "rooms", roomId, "duties"); //İlk parametre db: Firestore veritabanını temsil eder.
    //İkinci parametre "rooms": Firestore'da odaları temsil eden koleksiyon adı.
    //Üçüncü parametre roomId: Hangi odanın (belgenin) hedeflendiğini belirtir.
    //Dördüncü parametre "duties": Bu odanın içindeki görevleri temsil eden alt koleksiyon
    const dutyRef = await addDoc(dutiesCollection, dutyData); // addDoc Görev bilgilerini (dutyData) belirtilen koleksiyona ekler
    return dutyRef.id; //Firestore'da eklenen görevin benzersiz ID'si.
  } catch (error) {
    throw error;
  }
};
