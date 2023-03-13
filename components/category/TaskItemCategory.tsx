import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { Task } from "../../store/slices/allTasksSlice";
import { useState } from "react";
import { checkTaskIsPresent } from "../../utils/checkTaskIsPresent";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  category: string;
  /**
   * use state passé en props
   */
  setActivatedTasks?: any;
  activatedTasks: Task[];
  path_icon_todo: string;
  days: string[];
};

const TaskItemCategory = ({ title, reward, id, category, setActivatedTasks, activatedTasks, path_icon_todo, days }: TaskItemProps) => {
  const [clickedTask, setClickedTask] = useState(false);

  const handleAddToActiveDay = () => {
    if (clickedTask) {
      const newArrayTasks = activatedTasks.filter((t) => {
        return t.id !== id;
      });

      setActivatedTasks(newArrayTasks);
      setClickedTask(false);
      return;
    }

    const taskToAdd: Task = {
      id,
      title,
      category,
      reward,
      description: "desc",
      is_done: false,
      associated_day: "",
      path_icon_todo,
    };

    setClickedTask(!clickedTask);

    if (!checkTaskIsPresent(activatedTasks, taskToAdd)) {
      setActivatedTasks((old: any) => [...old, taskToAdd]);
    }
  };

  return (
    <Pressable onPress={handleAddToActiveDay} style={[styles.container, clickedTask ? styles.active : styles.default]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reward}>{reward} Points</Text>
      <View style={{ flexDirection: "row" }}>
        {days.map((dayLabel, index) => (
          <Text key={index} style={styles.text}>
            {dayLabel}
          </Text>
        ))}
      </View>
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
    color: GlobalStyles.colors.h1,
    fontWeight: "bold",
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  reward: {
    fontWeight: "bold",
    color: GlobalStyles.colors.muted,
  },
});

export default TaskItemCategory;
