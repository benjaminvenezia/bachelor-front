import { View, Text } from "react-native";
import { HabitsList } from "../components";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/style";

const HabitsScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Habitudes</Text>
      <HabitsList />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default HabitsScreen;
