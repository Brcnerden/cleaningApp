import React from "react";
import { Button, View, StyleSheet, ImageBackground } from "react-native";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/tempFooter";
import InputHeader from "../components/InputHeader";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/backgorund1.png")}
        style={styles.background}
      >
        <View style={styles.box}>
          <Header />

          <InputHeader
            text="Oturma Odası"
            img={require("../assets/images/livingroom-furniture-svgrepo-com 1.png")}
          />

          <View>
            <Button
              title="Go to Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Go to SingIn"
              onPress={() => navigation.navigate("SingIn")}
            />
          </View>
        </View>

        <Footer />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  box: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
