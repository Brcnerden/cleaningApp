import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

export default function SingInScreens() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  return (
    <ImageBackground
      source={require("../assets/images/backgorund1.png")}
      style={styles.background}
    >
      {/* <View style={styles.container}>
        <Image
          source={require("../assets/images/Button Back Dark.png")}
          style={styles.backIcon}
        />

        <Text style={styles.title}>CLEANING APP</Text>
      </View> */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>E-Posta hesabın ile Kayıt Ol</Text>
        <View>
          <Text style={styles.inputText}>E-Posta</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="E-Posta"
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Şifre</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Şifre"
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Şifre Tekrar</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Şifre"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kayıt OL</Text>
        </TouchableOpacity>
        <Text style={styles.SingIn}>Giriş Yap</Text>
        <View style={styles.FooterBox}>
          <Text style={styles.footer}>ya da bununla devam et</Text>
          <View style={styles.icons}>
            <View>
              <Image
                source={require("../assets/images/Button Primary (1).png")}
              />
            </View>
            <View>
              <Image
                source={require("../assets/images/Button Primary (2).png")}
              />
            </View>
            <View>
              <Image source={require("../assets/images/Button Primary.png")} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    width: "100%",
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 18,
  },
  backIcon: {
    width: 24,
    height: 13,
  },
  title: {
    width: "85%",
    color: colors.primary,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  box: {
    width: 335,
    height: 695,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginHorizontal: 30,
    paddingTop: 27,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  boxTitle: {
    color: colors.titleColor,
    fontSize: 24,
    textAlign: "left",
    alignItems: "flex-start",
    fontFamily: "Poppins_600SemiBold",
  },
  inputText: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.titleColor,
    marginTop: 25,
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  input: {
    width: 295,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: colors.borderColor,
  },
  password: {
    width: "100%",
    textAlign: "right",
    marginTop: 12,
    marginBottom: 14,
    fontSize: 16,
    fontWeight: 400,
    color: colors.titleColor,
  },
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    padding: 0,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 4,
    width: 294,

    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  SingIn: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    textAlign: "center",
    marginTop: 18,
  },
  footer: {
    color: colors.textColor,
  },
  FooterBox: {
    flex: 1,
    justifyContent: "flex-end",
  },
  icons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    marginTop: 16,
  },
});
