import { Text, StyleSheet, Pressable, Vibration, ImageBackground, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { toggleStatus, removeTask } from "../../store/slices/activeTasksSlice";
import { useEffect, useState } from "react";
import { removeTaskFromDatabase } from "../../utils/http/httpTask";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { toggleStatusTaskInDatabase } from "../../utils/http/httpTask";
import { setUserPointsInDatabase } from "../../utils/http/httpUser";
import { setUserPoints } from "../../store/slices/userSlice";
import images from "../../constants/images";

type TaskItemProps = {
  id: string;
  title: string;
  reward: number;
  style?: any;
  is_done: boolean;
  path_icon_todo: string;
};

const TaskItem = ({ title, reward, id, style, path_icon_todo, is_done }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatePointsMessage, setUpdatePointsMessage] = useState("");
  const user = useSelector((state: RootState) => state.user);

  let timeoutDeletingId: any;
  let timeoutTogglingId: any;

  const handleRemove = () => {
    removeTaskFromDatabase(id, user.user.token);
    dispatch(removeTask({ id: id }));
    Vibration.vibrate(200);
    setIsDeleting(false);
  };

  const handlePressIn = () => {
    dispatch(toggleStatus({ id: id }));
    toggleStatusTaskInDatabase(id, user.user.token, is_done);

    if (!is_done) {
      dispatch(setUserPoints({ points: reward }));
      setUserPointsInDatabase(user.user.user.id, user.user.token, (user.user.user.points += reward), dispatch);
    }
  };

  const handlePressOut = () => {
    clearTimeout(timeoutTogglingId);
    clearTimeout(timeoutDeletingId);
  };

  const handlePrintMessageDuringDeletion = () => {
    const delayBeforePrintingInMs = 500;

    timeoutDeletingId = setTimeout(() => {
      setIsDeleting(true);
    }, delayBeforePrintingInMs);
  };

  return (
    <Pressable
      onPress={handlePressIn}
      onLongPress={handleRemove}
      delayLongPress={2000}
      onPressIn={handlePrintMessageDuringDeletion}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        style,
        isDeleting ? { backgroundColor: GlobalStyles.colors.deleting } : "",
        is_done ? styles.disabled : null,
      ]}
    >
      <ImageBackground borderRadius={20} source={images[path_icon_todo]} style={styles.icon} />
      {!isDeleting && (
        <View style={styles.iconContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.text, styles.reward]}>{reward} Points</Text>
          <Text style={styles.text}>{updatePointsMessage}</Text>
        </View>
      )}
      {isDeleting && <Text style={styles.deleting}>Suppression de la tâche en cours...</Text>}
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

    backgroundColor: GlobalStyles.colors.todo,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffffcd",
    borderRadius: 20,
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Roboto-Italic",
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
  reward: {
    fontWeight: "bold",
    fontSize: 15,
    color: GlobalStyles.colors.muted,
  },
  deleting: {
    fontSize: 20,
    color: "red",
  },
  disabled: {
    opacity: 0.25,
  },
});

export default TaskItem;
