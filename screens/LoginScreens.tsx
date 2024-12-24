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
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { signInUser } from "../services/auth";
import { UserData, createUser } from "../services/user";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

type LoginUser = {
  id: string;
  password: string;
  email: string;
  nickname: string;
  createDate: number;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .required("E-posta zorunludur."),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .required("Şifre zorunludur."),
});

const LoginScreens: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async (
    values: UserData,
    { setSubmitting, setErrors }: FormikHelpers<UserData> //Form gönderilirken, bir "yükleniyor" durumu başlatır veya sonlandırır. //Sunucudan veya işlemden kaynaklanan doğrulama hatalarını forma yansıtır
  ) => {
    try {
      const { email, password } = values;
      const userCredential = await signInUser(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          createUser(user.uid, {
            id: user.uid,
            password: values.password,
            email: values.email,
            likes: [],
            nickname: "",
            createDate: Date.now(),
          } as LoginUser)
            .then(() => {
              alert("success");
            })
            .catch((e) => {
              console.log(e);
            });

          console.log("user", user);
        })
        .catch((error) => {
          setErrors(error.code);
        });
      console.log("Giriş başarılı:");
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Giriş hatası:", error.message);
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
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }: FormikProps<UserData>) => (
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
            <Text style={styles.boxTitle}>E-Posta hesabın</Text>
            <Text style={styles.boxTitle}>ile giriş yap</Text>
            <View>
              <Text style={styles.inputText}>E-Posta</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="E-Posta"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
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
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.password}>Şifremi unuttum</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
            <Text style={styles.SingIn}>Hesap Oluştur</Text>
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
export default LoginScreens;
