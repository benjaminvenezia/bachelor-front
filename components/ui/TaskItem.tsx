import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus } from "../../store/slices/activeTasksSlice";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../../store/slices/allTasksSlice";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  category: string;
  isPresentation?: boolean;
  setActivatedTasks?: any;
  activatedTasks?: Array<Task>;
};

const TaskItem = ({ title, reward, id, style, category, isPresentation, setActivatedTasks, activatedTasks }: TaskItemProps) => {
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleStatus({ id: id }));

  const handleAddToActiveDay = () => {
    const taskToAdd: Task = {
      id,
      title,
      category,
      reward,
      is_done: false,
    };

    const allTasksIndexes = activatedTasks?.map((task) => task.id);

    if (!allTasksIndexes?.includes(taskToAdd.id)) {
      setActivatedTasks((old: any) => [...old, taskToAdd]);
    }
  };

  return (
    <Pressable onPress={isPresentation ? handleAddToActiveDay : handleToggle} style={[styles.container, style]}>
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
