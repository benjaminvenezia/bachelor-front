import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { Gage } from "../../../types/Gage";

const GageTeamItem = ({ id, title, description, is_done, cost, category, day, month, year, user_name, user_points }: Gage) => {
  return (
    <Pressable style={[styles.container, is_done ? styles.isDone : {}]}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      {/* <Text style={styles.text}>{description}</Text> */}
      <Text style={styles.text}>Attribué à {user_name}</Text>
      <Text>{user_name}</Text>
      <Text style={styles.text}>
        {day} - {month} - {year}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.todo,
    padding: 10,
  },
  isDone: {
    backgroundColor: GlobalStyles.colors.done,
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});

export default GageTeamItem;
