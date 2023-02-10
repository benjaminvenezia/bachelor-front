import { Text, StyleSheet, Pressable, Image } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { useSelector } from "react-redux";
import { Task } from "../../store/slices/allTasksSlice";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  category: string;
  setActivatedTasks?: any;
  activatedTasks?: Array<Task>;
  pathIconTodo: string;
};

const TaskItemCategory = ({ title, reward, id, category, setActivatedTasks, activatedTasks, pathIconTodo }: TaskItemProps) => {
  const homeTasks = useSelector((state: RootState) => state.activeTasksList);
  const [clickedTask, setClickedTask] = useState(false);

  const handleAddToActiveDay = () => {
    setClickedTask(!clickedTask);

    const taskToAdd: Task = {
      id,
      title,
      category,
      reward,
      isDone: false,
      associatedDays: [],
      pathIconTodo,
    };

    const locallyTasksIndexes = activatedTasks?.map((task) => task.id);
    const homeTasksIndexes = homeTasks["activeTasks"].map((task) => task.id);

    if (!locallyTasksIndexes?.includes(taskToAdd.id) && !homeTasksIndexes.includes(taskToAdd.id)) {
      setActivatedTasks((old: any) => [...old, taskToAdd]);
    }
  };

  return (
    <Pressable onPress={handleAddToActiveDay} style={[styles.container, clickedTask ? styles.active : styles.default]}>
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
  active: {
    backgroundColor: "purple",
  },
  default: {
    backgroundColor: "pink",
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

export default TaskItemCategory;
