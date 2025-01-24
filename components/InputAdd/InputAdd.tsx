import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  GestureResponderEvent,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDuty } from "../../redux/userSlice";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { RootState } from "../../redux/store";

import styles from "./InputAdd.styles";
import UUID from "react-native-uuid";
import { addDutyToRoom } from "../../services/dutyService";

interface Duty {
  text: string;
  number: number;
  date: string;
  id: string;
  duration: string;
  roomId: string;
  roomName: string;
}

type Task = string;

export default function InputAdd({ isOpen, roomId }: any): JSX.Element {
  const [customTask, setCustomTask] = useState<string>(""); // Kullanıcının yazdığı görev
  const [selectedTask, setSelectedTask] = useState<string>(""); // Seçilen görev
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal görünürlüğü
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<string>("GÜNLÜK");

  const [tasks, setTasks] = useState<Task[]>([
    "Süpürge",
    "Toz Alma",
    "Paspas",
    "Cam Silme",
    "Perde Yıkama ",
    "Çiçekleri Sula",
    "Koltukları Sil",
    "Halı Silme",
  ]); // Görevler listesi
  const roomIdSelect = useSelector((state: RootState) => state.user.roomId);

  const newDuty: Duty = {
    id: UUID.v4(),
    text: customTask,
    number: 1,
    date: date.toLocaleDateString(),
    duration: selectedDuration,
    roomId: roomIdSelect,
    roomName: "oturma Odası",
  };

  const dispatch = useDispatch();
  const duty = useSelector((state: RootState) => state.user.duty);

  const hadleAddTask = async () => {
    // dispatch(setDuty(newDuty));
    // setCustomTask(""); // Input'u temizle
    // setSelectedTask("");
    // isOpen(false);

    try {
      const dutyId = await addDutyToRoom(roomIdSelect, newDuty);
      dispatch(setDuty(newDuty));

      setCustomTask("");
      setSelectedTask("");
      isOpen(false);
    } catch (error) {
      console.error("Görev eklerken hata oluştu ");
    }
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
  };

  // Görev yazılırken input değeri güncelleniyor
  const handleCustomTaskChange = (text: string): void => {
    setCustomTask(text);
    setIsModalVisible(false);
  };

  const handleDateConfirm = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ): void => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  // Seçilen görev inputa ekleniyor
  const handleSelectTask = (task: Task): void => {
    setSelectedTask(task);
    setCustomTask(task);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require("../../assets/images/livingroom-furniture-svgrepo-com 1.png")}
        />
        <Text style={styles.titleText}>Oturma Odası</Text>
      </View>
      <Text style={styles.label}>Görev Ekle</Text>

      {/* Seçilen veya yazılan görev input alanı */}
      <TouchableOpacity
        style={styles.input}
        onPress={(event: GestureResponderEvent) => setIsModalVisible(true)}
      >
        <Text style={styles.selectedTaskText}>
          {customTask ? customTask : "Bir görev seçin"}
        </Text>
      </TouchableOpacity>

      {/* Kullanıcı yeni görev yazmak isterse */}
      <TextInput
        value={customTask}
        onChangeText={handleCustomTaskChange}
        style={styles.input}
        placeholder="Kendi görevinizi yazın"
      />

      {/* Modal - Görev listesi */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.taskButton}
                  onPress={() => handleSelectTask(item)}
                >
                  <Text style={styles.taskText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tarih seçimi */}
      <TouchableOpacity style={styles.time} onPress={() => setShowPicker(true)}>
        <TextInput placeholder="Tarih Gir" value={date.toLocaleDateString()} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateConfirm}
        />
      )}

      <Text style={styles.dutyText}>Görevin Tekrarlanma Süresini Seç</Text>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleDurationSelect("GÜNLÜK")}>
          <Text
            style={[
              styles.dayText,
              selectedDuration === "GÜNLÜK" && styles.dayText,
            ]}
          >
            GÜNLÜK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDurationSelect("HAFTALIK")}>
          <Text
            style={[
              styles.dayText,
              styles.weekText,
              selectedDuration === "HAFTALIK" && styles.weekText,
            ]}
          >
            HAFTALIK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDurationSelect("AYLIK")}>
          <Text
            style={[
              styles.dayText,
              styles.monthText,
              selectedDuration === "AYLIK" && styles.monthText,
            ]}
          >
            AYLIK
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={hadleAddTask}>
        <Text style={styles.addDuty}>Görevi Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}
