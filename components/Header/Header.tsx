import { StyleSheet, Text, View } from "react-native";
import CalendarApp from "../Calendar";
import colors from "../../colors";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function Header() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLEANING APP</Text>
      <CalendarApp />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    paddingTop: 44,
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 13,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
