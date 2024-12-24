import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../colors";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

type propsType = {
  img: any;
  text: string;
};

export default function InputHeader({ img, text }: propsType) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  return (
    <View style={styles.contanier}>
      <View style={styles.title}>
        <Image style={styles.image} source={img} />
        <Text style={styles.titleText}>{text}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Text style={styles.detailText}>Detay</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.detailAdd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contanier: {
    width: 335,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  title: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 16,
    color: colors.titleColor,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 24,
  },
  detailText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginLeft: 10,
  },
  detailAdd: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 10,
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
