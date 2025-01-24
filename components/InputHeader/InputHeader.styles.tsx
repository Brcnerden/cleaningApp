import colors from "../../colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contanier: {
    flex: 0,
    width: 335,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 50,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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
    marginLeft: 12,
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
  flatList: {
    flexGrow: 0, // İçeriğin boyutuna göre genişler
  },
  listContent: {},
});

export default styles;
