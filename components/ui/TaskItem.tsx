import { Text, StyleSheet, Pressable, Image } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus } from "../../store/slices/activeTasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../store/slices/allTasksSlice";
import { RootState } from "../../store/store";
import { useState } from "react";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  category: string;
  isPresentation?: boolean;
  setActivatedTasks?: any;
  activatedTasks?: Array<Task>;
  associatedDay: string;
  pathIconTodo: string;
};

const TaskItem = ({
  title,
  reward,
  id,
  style,
  category,
  associatedDay,
  isPresentation,
  setActivatedTasks,
  activatedTasks,
  pathIconTodo,
}: TaskItemProps) => {
  const homeTasks = useSelector((state: RootState) => state.activeTasksList);

  const [clickedTask, setClickedTask] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleStatus({ id: id }));

  const handleAddToActiveDay = () => {
    setClickedTask(true);

    const taskToAdd: Task = {
      id,
      title,
      category,
      reward,
      isDone: false,
      associatedDay,
      pathIconTodo,
    };

    const locallyTasksIndexes = activatedTasks?.map((task) => task.id);
    const homeTasksIndexes = homeTasks["tasks"].map((task) => task.id);

    if (!locallyTasksIndexes?.includes(taskToAdd.id) && !homeTasksIndexes.includes(taskToAdd.id)) {
      setActivatedTasks((old: any) => [...old, taskToAdd]);
    }
  };

  if (isPresentation) {
    return (
      <Pressable
        onPress={isPresentation ? handleAddToActiveDay : handleToggle}
        style={[styles.container, clickedTask ? styles.active : styles.default]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.reward}>{reward} Points</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={isPresentation ? handleAddToActiveDay : handleToggle} style={[styles.container, style]}>
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
  active: {
    backgroundColor: "purple",
  },
  default: {
    backgroundColor: "lightblue",
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
