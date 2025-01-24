import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Calendar, DateData } from "react-native-calendars"; // DateData: Takvimde seçilen tarihin özelliklerini içeren veri tipi
import colors from "../colors";
import { useFonts } from "expo-font";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

const CalendarApp: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  const [selectedWeek, setSelectedWeek] = useState<Date[]>([]);
  const [isWeekVisible, setIsWeekVisible] = useState(true); // Haftalık görünüm aktif
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Haftalık tarihleri hesaplar
  const getWeekDates = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Pazartesi
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);
      return day;
    });
  };

  useEffect(() => {
    const today = new Date();
    const week = getWeekDates(today);
    setSelectedWeek(week); // Haftayı state'e ekle
    setSelectedDate(today.toISOString().split("T")[0]);
  }, []);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString); // Seçilen günü işaretle
    const week = getWeekDates(new Date(day.dateString));
    setSelectedWeek(week);
    setIsWeekVisible(true); // Haftalık görünümü geri getir
  };

  const handleDateClick = (date: Date) => {
    setIsWeekVisible(false); // Takvimi göster
  };

  return (
    <View
      style={[
        styles.container,
        { height: isWeekVisible ? 58 : 400 }, // Haftalık veya aylık görünüm için yükseklik değişimi
      ]}
    >
      {/* Haftalık Görünüm */}
      {isWeekVisible && (
        <View style={styles.weekContainer}>
          {/* Gün İsimleri */}
          <View style={styles.dayNamesRow}>
            {selectedWeek.map((date, index) => (
              <Text key={index} style={styles.dayName}>
                {date.toLocaleDateString("tr-TR", { weekday: "short" })}
              </Text>
            ))}
          </View>

          {/* Tarihler */}
          <View style={styles.dateRow}>
            {selectedWeek.map((date, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDateClick(date)}
              >
                <View style={styles.dateContainer}>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === date.toISOString().split("T")[0]
                        ? styles.selectedDateText
                        : null,
                    ]}
                  >
                    {date.getDate()}
                  </Text>

                  {/* Seçili günün altına nokta (Ellipse 30.png) */}
                  {selectedDate === date.toISOString().split("T")[0] && (
                    <Image
                      source={require("../assets/images/Ellipse 30.png")} // Görselin yolu
                      style={styles.selectedDot}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Takvim Görünümü */}
      {!isWeekVisible && (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate!]: {
              selected: true,
              selectedColor: colors.primary, // Seçili günün rengi
              selectedTextColor: colors.primary, // Seçili günün yazı rengi
            },
          }}
          theme={{
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: "white",
            todayTextColor: "red",
            arrowColor: "blue",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width: 330,
    marginBottom: 42,
  },
  weekContainer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  dateContainer: {
    alignItems: "center", // Sayıyı ve nokta alt alta yerleştir
  },
  dayName: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: colors.weekColor,
    fontFamily: "Poppins_500Medium",
  },
  dateText: {
    fontSize: 20,
    color: colors.dayColor,
    fontFamily: "Poppins_400Regular",
  },
  selectedDateText: {
    color: colors.primary, // Seçili günün rengi
    fontWeight: "bold",
  },
  selectedDot: {
    marginTop: 5,
    width: 8, // Görselin genişliği
    height: 8, // Görselin yüksekliği
    resizeMode: "contain", // Görselin orantılı bir şekilde küçülmesini sağlar
  },
});

export default CalendarApp;
