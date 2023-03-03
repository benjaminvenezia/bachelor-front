import { Text, StyleSheet, Pressable, Image, Vibration } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus, removeTask } from "../../store/slices/activeTasksSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeTaskFromDatabase } from "../../utils/http/httpTask";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleStatusTaskInDatabase } from "../../utils/http/httpTask";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  isDone: boolean;
  pathIconTodo: string;
};

const TaskItem = ({ title, reward, id, style, pathIconTodo, isDone }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  //Ici on doit mettre à jour les points de l'utilisateur
  const handleToggle = () => {
    dispatch(toggleStatus({ id: id }));
    toggleStatusTaskInDatabase(id, user.user.token, isDone);
  };

  const user = useSelector((state: RootState) => state.user);

  const handleRemove = () => {
    setIsDeleting(false);
    removeTaskFromDatabase(id, user.user.token);
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
