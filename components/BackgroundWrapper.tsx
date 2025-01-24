import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Header from "./Header/Header";
import Footer from "./Footer/tempFooter";

export default function BackgroundWrapper({ children }: any) {
  return (
    <ImageBackground
      source={require("../assets/images/backgorund1.png")}
      style={styles.background}
    >
      <Header />
      {children}
      <Footer />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
