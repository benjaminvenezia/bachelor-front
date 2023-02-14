import { Text, StyleSheet, Pressable, Image, Vibration } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus, removeTask } from "../../store/slices/activeTasksSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  pathIconTodo: string;
};

const TaskItem = ({ title, reward, id, style, pathIconTodo }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => dispatch(toggleStatus({ id: id }));

  const handleRemove = () => {
    setIsDeleting(false);
    dispatch(removeTask({ id: id }));
    Vibration.vibrate(200);
  };

  const handlePrintMessageDuringDeletion = () => {
    const delayBeforePrintingInMs = 150;

    setTimeout(() => {
      setIsDeleting(true);
    }, delayBeforePrintingInMs);
  };

  return (
    <Pressable
      onPress={handleToggle}
      onLongPress={handleRemove}
      delayLongPress={2000}
      onPressIn={handlePrintMessageDuringDeletion}
      style={[styles.container, style, isDeleting ? { backgroundColor: GlobalStyles.colors.deleting } : ""]}
    >
      <Image style={styles.icon} source={pathIconTodo} />
      {!isDeleting && (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.reward}>{reward} Points</Text>
        </>
      )}
      {isDeleting && <Text>Suppression de la tâche en cours...</Text>}
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
