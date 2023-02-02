import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus } from "../../store/slices/tasksListSlice";
import { useDispatch } from "react-redux";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
};

const TaskItem = ({ title, reward, id, style }: TaskItemProps) => {
  const dispatch = useDispatch();

  return (
    <Pressable onPress={() => dispatch(toggleStatus({ id: id }))} style={[styles.container, style]}>
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
