import { StyleSheet, Text, View, Image } from "react-native";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

type propsType = {
  img: any;
  text: string;
};

export default function Buttons({ img, text }: propsType) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  return (
    <View style={styles.contanier}>
      <Image style={styles.img} source={img} />

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    marginTop: 17,
  },
  contanier: {
    alignItems: "center",
    flexDirection: "column",
  },
});
