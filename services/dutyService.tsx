import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

export const addDutyToRoom = async (userId: string, dutyData: any) => {
  try {
    const dutiesCollection = collection(db, "users", userId, "duties");

    console.log("Gönderilen veri:", dutyData); // Verileri göndermeden önce logla

    const docRef = await addDoc(dutiesCollection, dutyData);

    console.log("Belge ID'si:", docRef.id); // Belge ID'sini logla

    return { success: true };
  } catch (error) {
    console.error("Firebase'e veri gönderilirken hata oluştu:", error); // Hatayı logla
    throw error;
  }
};
