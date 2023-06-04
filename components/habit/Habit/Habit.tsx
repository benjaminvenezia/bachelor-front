import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { HabitProps } from "./HabitProps";
import Title from "../../ui/Title/Title";

const Habit = ({ title, description, category, path_icon }: HabitProps) => {
  return (
    <View style={styles.container}>
      <Title titleType="h2" style={styles.text}>
        {title}
      </Title>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default Habit;
