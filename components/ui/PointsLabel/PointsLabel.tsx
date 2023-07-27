import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const PointsLabel = () => {
  return <Text style={styles.text}>PC</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "orange",
  },
});

export default PointsLabel;
