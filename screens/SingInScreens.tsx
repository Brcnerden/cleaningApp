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
import { createAuth } from "../services/auth";

import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "SingIn">;

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .required("E-posta zorunludur."),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .required("Şifre zorunludur."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor.")
    .required("Şifre tekrar alanı zorunludur."),
});

const SingInScreens: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSingUp = async (
    values: SignUpFormValues,
    { setSubmitting, setErrors }: FormikHelpers<SignUpFormValues> //Form gönderilirken, bir "yükleniyor" durumu başlatır veya sonlandırır. //Sunucudan veya işlemden kaynaklanan doğrulama hatalarını forma yansıtır
  ) => {
    try {
      await createAuth(values.email, values.password);
      console.log("kayıt başarılı");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Kayıtlı hatası:", error.message);
    }
  };
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={SignUpSchema} // yup dogrulama şemasını çağırıyor
      onSubmit={handleSingUp} //handleSingUp fonksiyonu aktive eder.
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }: FormikProps<SignUpFormValues>) => (
        <ImageBackground
          source={require("../assets/images/backgorund1.png")}
          style={styles.background}
        >
          <View style={styles.box}>
            <Text style={styles.boxTitle}>E-Posta hesabın ile Kayıt Ol</Text>
            <View>
              <Text style={styles.inputText}>E-Posta</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="E-Posta"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View>
              <Text style={styles.inputText}>Şifre</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Şifre"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <View>
              <Text style={styles.inputText}>Şifre Tekrar</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Şifre"
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Yükleniyor..." : "Kayıt Ol"}
              </Text>
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
                  <Image
                    source={require("../assets/images/Button Primary.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </Formik>
  );
};

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
  error: {
    color: "red",
  },
});

export default SingInScreens;
