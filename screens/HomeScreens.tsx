import {
  Button,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/tempFooter";
import InputHeader from "../components/InputHeader/InputHeader";
import CalendarApp from "../components/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Duty, addRoom } from "../redux/userSlice";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
  AddRoom: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddRoom">;

export default function HomeScreen() {
  const handlePress = () => {
    navigation.navigate("AddRoom"); // "AddRoomScreen" yönlendirme adı
  };

  const navigation = useNavigation<NavigationProp>();

  const rooms = useSelector((state: RootState) => state.user?.rooms || []);
  const dispatch = useDispatch();

  const [newRoomName, setNewRoomName] = useState("");

  const handleAddRoom = () => {
    if (newRoomName.trim() === "") return;

    const newRoom = {
      id: Date.now().toString(),
      name: newRoomName,
      icon: "default-icon.png",
      tasks: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    };

    dispatch(addRoom(newRoom));
    setNewRoomName("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/backgorund1.png")}
        style={styles.background}
      >
        <View style={styles.box}>
          <Header />
          <CalendarApp />

          <FlatList
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <InputHeader text={item.name} img={item.icon} roomId={item.id} />
            )}
          />

          <TouchableOpacity onPress={handlePress} style={styles.addRoomButton}>
            <Text style={styles.addRoomText}>Oda Ekle</Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  box: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addRoomButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addRoomText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#DC3545",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
