import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";

type TaskItemProps = {
  title: string;
  reward: number;
};

const TaskItem = ({ title, reward }: TaskItemProps) => {
  return (
    <Pressable onPress={() => alert(1)} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reward}>{reward} Points</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginRight: 2,
    marginBottom: 2,
    width: "33.3333%",
    height: 130,
    backgroundColor: GlobalStyles.colors.todo,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  reward: {
    fontWeight: "bold",
    color: GlobalStyles.colors.muted,
  },
});

export default TaskItem;
