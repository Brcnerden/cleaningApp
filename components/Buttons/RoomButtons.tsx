import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./RoomButtons.styles";

type RoomButtonProps = {
  name: string;
  img: any;
  onPress: () => void;
};

const RoomButtons = ({ name, img, onPress }: RoomButtonProps) => {
  return (
    <View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.image}>
            <Image source={img} />
          </View>

          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default RoomButtons;
