import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { HabitListItemProps } from "./HabitListItemProps";
import Title from "../../ui/Title/Title";

const HabitListItem = ({ title, description, category, path_icon }: HabitListItemProps) => {
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
    backgroundColor: GlobalStyles.colors.secondary,
    minHeight: 150,
    borderRadius: 25,
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default HabitListItem;
