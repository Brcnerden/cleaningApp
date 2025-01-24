import colors from "../../colors";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contanier: {
    width: 335,
    borderColor: colors.borderColor,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  rightText: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberText: {
    marginRight: 20,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
  },
  titleText: {
    marginRight: 25,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 24,
  },
  timeText: {
    color: colors.timeColor,
    fontSize: 12,
  },
  dayText: {
    width: 60,
    backgroundColor: colors.yellowColor,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "center",
    borderRadius: 40,
  },
  monthText: {
    color: colors.white,
    backgroundColor: colors.brownColor,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 60,
  },
  weekText: {
    color: colors.white,
    backgroundColor: colors.orangeColor,
    width: 65,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "center",
    borderRadius: 40,
  },
});

export default styles;
