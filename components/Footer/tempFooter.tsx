import { StyleSheet, Text, View, Image } from "react-native";
import Buttons from "./Buttons";
import colors from "../../colors";

export default function Footer() {
  return (
    <View style={styles.contanier}>
      <Buttons
        text="Ana Sayfa"
        img={require("../../assets/images/Icon (2).png")}
      />
      <Buttons text="Takvim" img={require("../../assets/images/Icon.png")} />
      <Buttons
        text="İstatistik"
        img={require("../../assets/images/Icon (3).png")}
      />
      <Buttons
        text="Profile"
        img={require("../../assets/images/Icon (1).png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contanier: {
    height: 88,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderColor: colors.titleColor,
    borderWidth: 1,
    alignItems: "center",
  },
});
