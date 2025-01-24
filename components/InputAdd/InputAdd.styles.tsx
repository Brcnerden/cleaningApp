import { StyleSheet } from "react-native";
import colors from "../../colors";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

const styles = StyleSheet.create({
  container: {
    height: "80%",
    backgroundColor: colors.white,
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 24,
    elevation: 5,
    padding: 20,
  },
  label: {
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    fontSize: 14,
    borderColor: colors.borderColor,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 20,
  },
  selectedTaskText: {
    color: colors.textColor,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  taskButton: {
    backgroundColor: colors.primary,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: {
    color: colors.white,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    borderColor: colors.borderColor,
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginTop: 20,
  },
  dayText: {
    width: 80,
    backgroundColor: colors.yellowColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 10,
    textAlign: "center",
    borderRadius: 40,
  },
  monthText: {
    color: colors.white,
    backgroundColor: colors.brownColor,
  },
  weekText: {
    color: colors.white,
    backgroundColor: colors.orangeColor,
  },
  button: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 40,
  },
  addDuty: {
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 60,
    paddingVertical: 12,
    marginTop: 60,
    elevation: 10,
    borderRadius: 5,
    fontFamily: "Poppins_600SemiBold",
  },
  dutyText: {
    width: "100%",
    fontSize: 14,
    marginTop: 40,
    fontFamily: "Poppins_600SemiBold",
  },
  titleText: {
    fontSize: 16,
    color: colors.titleColor,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 24,
    marginLeft: 12,
  },
  title: {
    flexDirection: "row",
    marginBottom: 16,
  },
});
export default styles;
