import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../colors";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SingIn: undefined;
  AddRoom: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddRoom">;

export default function Header() {
  const navigation = useNavigation<NavigationProp>();
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
      <View style={styles.text}>
        <Text style={styles.title}>CLEANING APP</Text>
        {/* <View>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttons}>+</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 13,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    paddingTop: 44,
  },
  buttons: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 13,
    marginLeft: 24,
    fontWeight: "bold",
  },
});
