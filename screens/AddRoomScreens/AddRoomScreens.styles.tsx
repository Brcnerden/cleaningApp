import colors from "../../colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 24,
    paddingLeft: 32,
  },
  contanier: {
    flex: 1,
    paddingHorizontal: 28,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default styles;
