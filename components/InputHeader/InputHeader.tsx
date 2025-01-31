import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useState, useEffect } from "react";
import InputAdd from "../InputAdd/InputAdd";
import styles from "./InputHeader.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Inputs from "../Inputs/Inputs";
import { useDispatch } from "react-redux";
import { setRoomId, Duty } from "../../redux/userSlice";

type propsType = {
  img: any;
  text: string;
  roomId: string;
};

export default function InputHeader({ img, text, roomId }: propsType) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  // const duty = useSelector((state: RootState) => state.user?.duty || []);

  // const allTasks = duty.flatMap((item) => [
  //   ...(item.daily || []),
  //   ...(item.weekly || []),
  //   ...(item.monthly || []),
  // ]);

  // const filteredDuties = allTasks.filter((task) => task.roomId === roomId);

  // Görevleri tek bir listeye çevir ve roomId'ye göre filtrele

  const duties = useSelector((state: RootState) => state.user.duties);

  const allDuties = [
    ...(duties?.daily || []),
    ...(duties?.weekly || []),
    ...(duties?.monthly || []),
  ];

  const allTasks = allDuties.flatMap((duty) => [
    ...(duty.daily || []),
    ...(duty.weekly || []),
    ...(duty.monthly || []),
  ]);

  console.log("allTask" + allTasks);
  console.log("allDuties" + JSON.stringify(allDuties, null, 2));

  useEffect(() => {
    dispatch(setRoomId(roomId));
  }, [roomId, dispatch]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  return (
    <View style={styles.contanier}>
      <View style={styles.box}>
        <View style={styles.title}>
          <Image style={styles.image} source={img} />
          <Text style={styles.titleText}>{text}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Text style={styles.detailText}>Detay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.detailAdd}>+</Text>
          </TouchableOpacity>
          <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <InputAdd isOpen={toggleModal} />
          </Modal>
        </View>
      </View>

      {allTasks.length > 0 ? (
        <FlatList
          data={allTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Inputs
              text={item.text}
              number={`${index + 1}`}
              date={item.date}
              duration={item.duration}
            />
          )}
          initialNumToRender={3} // İlk ekranda render edilecek öğe sayısı
          maxToRenderPerBatch={3} // Her partide render edilecek öğe sayısı
          windowSize={5} // Performansı artırmak için penceredeki öğe sayısı
          showsVerticalScrollIndicator={false} // Kaydırma çubuğunu gizler
          contentContainerStyle={styles.listContent}
          style={[styles.flatList]}
        />
      ) : (
        ""
      )}
    </View>
  );
}
