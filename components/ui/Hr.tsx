import { View, StyleSheet } from "react-native";
const Hr = () => {
  return <View style={styles.line}></View>;
};

const styles = StyleSheet.create({
  line: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#D4D4D4",
    width: "80%",
    marginVertical: 10,
  },
});

export default Hr;
