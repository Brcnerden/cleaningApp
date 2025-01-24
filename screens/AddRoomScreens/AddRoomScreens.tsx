import { View, Text, Alert } from "react-native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import styles from "./AddRoomScreens.styles";
import RoomButtons from "../../components/Buttons/RoomButtons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { addRoom } from "../../redux/userSlice"; // Redux slice importu
import { addRoomToUser } from "../../services/AddRoomToService";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
  AddRoom: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddRoom">;

const AddRoomScreens = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const handleAddRoom = async (roomName: string) => {
    try {
      if (!userId) {
        throw new Error("Kullanıcı oturum açmamış.");
      }

      const roomData = {
        id: new Date().toISOString(), // Benzersiz bir ID oluşturuyoruz
        name: roomName,
        icon: getRoomImage(roomName), // Varsayılan bir ikon ekleyebilirsiniz
        tasks: {
          daily: [],
          weekly: [],
          monthly: [],
        }, // Odanın görseli
      };

      await addRoomToUser(userId, roomName); // Veritabanına ekleme işlemi
      dispatch(addRoom(roomData)); // Redux store'a ekleyin

      console.log("Başarıyla eklendi");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Oda eklenirken hata oluştu:", error);
      Alert.alert("Hata", "Oda eklenemedi.");
    }
  };

  const getRoomImage = (roomName: string) => {
    switch (roomName) {
      case "Oturma Odası":
        return require("../../assets/images/livingroom-furniture-svgrepo-com 1.png");
      case "Mutfak":
        return require("../../assets/images/coolnes-freezer-svgrepo-com.png");
      case "Tuvalet":
        return require("../../assets/images/livingroom-furniture-svgrepo-com 1.png");
      case "Banyo":
        return require("../../assets/images/coolnes-freezer-svgrepo-com.png");
      default:
        return require("../../assets/images/coolnes-freezer-svgrepo-com.png");
    }
  };

  return (
    <BackgroundWrapper>
      <View>
        <Text style={styles.title}>Oda Ekle</Text>
      </View>
      <View style={styles.contanier}>
        {["Oturma Odası", "Mutfak", "Tuvalet", "Banyo", "Oda", "Diğer"].map(
          (roomName) => (
            <RoomButtons
              key={roomName}
              onPress={() => handleAddRoom(roomName)}
              name={roomName}
              img={getRoomImage(roomName)}
            />
          )
        )}
      </View>
    </BackgroundWrapper>
  );
};

export default AddRoomScreens;
