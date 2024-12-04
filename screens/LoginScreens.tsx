import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../colors";

export default function LoginScreens() {
  return (
    <ImageBackground
      source={require("../assets/images/backgorund1.png")}
      style={styles.background}
    >
      <View>
        <Text style={styles.title}>CLEANING APP</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    color: colors.primary,
    fontFamily: "Poppins",
  },
});
