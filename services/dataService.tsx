import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { v4 as uuidv4 } from "uuid"; // uuid kütüphanesini ekleyin

export const addDataToUser = async (
  userId: string,
  data: {
    type: "room" | "duty"; // Veri türünü belirtiyoruz
    name?: string; // Oda adı
    text?: string; // Görev açıklaması
    date?: string; // Görev tarihi
    duration?: string; // Görev sıklığı
    roomId?: string; // Görevin ilişkili olduğu oda ID'si
    roomName?: string; // Görevin ilişkili olduğu oda adı
  }
) => {
  const userDocRef = doc(db, "users", userId);
  const dataId = uuidv4();

  try {
    await updateDoc(userDocRef, {
      data: arrayUnion({
        // "data" adında tek bir liste kullanıyoruz
        id: dataId,
        type: data.type, // Veri türünü belirtiyoruz
        ...(data.type === "room"
          ? { name: data.name }
          : {
              // Oda ise sadece oda adını ekliyoruz
              text: data.text, // Görev ise görev bilgilerini ekliyoruz
              date: data.date,
              duration: data.duration,
              roomId: data.roomId,
              roomName: data.roomName,
            }),
      }),
    });
    console.log(`${data.type} başarıyla eklendi!`);
  } catch (error) {
    console.error(`${data.type} eklenirken hata oluştu:`, error);
  }
};
