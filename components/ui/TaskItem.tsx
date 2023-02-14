import { Text, StyleSheet, Pressable, Image } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus, removeTask } from "../../store/slices/activeTasksSlice";
import { useDispatch } from "react-redux";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  pathIconTodo: string;
};

const TaskItem = ({ title, reward, id, style, pathIconTodo }: TaskItemProps) => {
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleStatus({ id: id }));
  const handleRemove = () => dispatch(removeTask({ id: id }));

  return (
    <Pressable onPress={handleToggle} onLongPress={handleRemove} style={[styles.container, style]}>
      <Image style={styles.icon} source={pathIconTodo} />
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
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
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
