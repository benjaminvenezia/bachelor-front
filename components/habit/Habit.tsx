import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

const Habit = () => {
  return <Text style={styles.text}>Habit Component</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default Habit;
