import colors from "../../colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    borderWidth: 1,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderColor: colors.borderColor,

    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 24,
    color: colors.primary,
  },
  image: {
    alignItems: "center",
  },
});

export default styles;
