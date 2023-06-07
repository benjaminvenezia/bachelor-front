import { Text, StyleSheet, Pressable, View, ImageBackground } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { DefaultTask } from "../../../types/Task";
import { useState } from "react";
import { checkTaskIsPresent } from "../../../utils/checkTaskIsPresent";
import images from "../../../constants/images";
import BadgeDay from "../BadgeDay/BadgeDay";
import { TaskItemCategoryProps } from "./TaskItemCategoryProps.types";

const TaskItemCategory = ({
  title,
  reward,
  id,
  category,
  setActivatedTasks,
  activatedTasks,
  path_icon_todo,
  days,
}: TaskItemCategoryProps) => {
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

    const taskToAdd: DefaultTask = {
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
          <BadgeDay key={index} dayText={dayLabel} />
        ))}
      </View>
      <ImageBackground borderRadius={15} source={images[path_icon_todo]} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "white",
    paddingTop: 5,
    paddingBottom: 0,
    marginRight: 2,
    marginBottom: 2,
    width: "32.80%",
    height: 130,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  icon: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: -1,
  },
  title: {
    fontSize: 15,
    color: "black",
    fontFamily: GlobalStyles.police.task,
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: 20,
    fontFamily: GlobalStyles.police.task,
  },
  reward: {
    fontWeight: "bold",
    fontSize: 15,
    color: GlobalStyles.colors.muted,
  },
  active: {
    borderColor: GlobalStyles.colors.primary,
  },
  default: {
    backgroundColor: "pink",
  },
});

export default TaskItemCategory;
