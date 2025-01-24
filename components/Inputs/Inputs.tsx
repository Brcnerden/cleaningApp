import { Text, View, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./Inputs.styles";
import * as Animatable from "react-native-animatable";

type propsType = {
  number: string;
  text: string;
  date: string;
  duration: string;
};

export default function Inputs({ number, text, date, duration }: propsType) {
  const [isInputVisible, setIsInputVisible] = useState(true);
  const handleRemoveInput = () => {
    setIsInputVisible(false);
  };

  const getDayStyle = (): object => {
    switch (duration) {
      case "GÜNLÜK":
        return styles.dayText;
      case "HAFTALIK":
        return styles.weekText;
      case "AYLIK":
        return styles.monthText;
      default:
        return {};
    }
  };

  return (
    <>
      {isInputVisible && (
        <View style={styles.contanier}>
          <View style={styles.rightText}>
            <Text style={styles.numberText}>{number}</Text>
            <View>
              <Text style={styles.titleText}>{text}</Text>
              <Text style={styles.timeText}>{date}</Text>
            </View>
            <Text style={[getDayStyle()]}>{duration}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={handleRemoveInput}>
              <Image source={require("../../assets/images/Vector (1).png")} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
