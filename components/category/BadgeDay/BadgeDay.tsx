import { View, Text, StyleSheet } from "react-native";
import { BadgeDayProps } from "./BadgeDayProps.types";

const BadgeDay = ({ dayText }: BadgeDayProps) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.textBadge}>{dayText.substring(0, 1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "white",
    width: 15,
    height: 15,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
  textBadge: {
    fontWeight: "bold",
  },
});

export default BadgeDay;
