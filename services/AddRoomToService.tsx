import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../api/firebase-config";

export const addRoomToUser = async (userId: string, roomName: string) => {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      rooms: arrayUnion(roomName), // Firestore'da rooms alanına ekler  //arrayUnion Firebase Firestore'da bir işleçtir ve bir belge alanına belirli bir öğe eklemek için kullanılır. Ancak, öğe zaten mevcutsa tekrar eklenmez. Bu, bir dizide benzersiz öğeler oluşturmak için kullanışlıdırarrayUnion, yalnızca Firestore'da bulunan bir alanı güncellemek için updateDoc ile kullanılır. Eğer alan daha önce yoksa, Firestore bu alanı oluşturur ve verilen değeri ekler
    });
    console.log(`${roomName} Firestore'a eklendi.`);
  } catch (error) {
    console.error("Firestore oda ekleme hatası:", error);
    throw error;
  }
};
