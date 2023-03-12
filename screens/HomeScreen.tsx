import { FunctionComponent, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskItem, Hr, DaysContainer, CategoriesList, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import { fetchTasksFromDatabase } from "../utils/http/httpTask";
import { getGroupFromDatabase } from "../utils/http/httpGroup";

const HomeScreen: FunctionComponent = () => {
  const storeActiveDay = useSelector((state: RootState) => state.day);
  const tasks = useSelector((state: RootState) => state.activeTasksList);
  const user = useSelector((state: RootState) => state.user);
  const tasksNotDone = tasks["activeTasks"].filter((task) => !task.isDone && task.associatedDay === storeActiveDay["activeDay"]);
  const tasksDone = tasks["activeTasks"].filter((task) => task.isDone && task.associatedDay === storeActiveDay["activeDay"]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getTasks() {
      fetchTasksFromDatabase(user.user.token, dispatch);
    }

    async function getGroup() {
      getGroupFromDatabase(user.user.token, dispatch);
    }

    getTasks();
    getGroup();
  }, []);

  if (tasksDone.length === 0 && tasksNotDone.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <DaysContainer />
        <Text>Vos points : {user.user.user.points}</Text>
        <Title>Salut {user.user.user.name} Aucune tâche associée à ce jour!</Title>
        <CategoriesList />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DaysContainer />
      <ScrollView>
        <View style={styles.listContainer}>
          {tasksNotDone.map((item) => (
            <TaskItem
              key={item.id}
              title={item.title}
              reward={item.reward}
              id={item.id}
              isDone={item.isDone}
              pathIconTodo={item.pathIconTodo}
            />
          ))}

          {tasksNotDone.length === 0 && <Text style={styles.message}>Pas de tâches prévue aujourd'hui.</Text>}
        </View>
        <Hr />
        <View style={styles.listContainer}>
          {tasksDone.map((item) => (
            <TaskItem
              key={item.id}
              title={item.title}
              reward={item.reward}
              id={item.id}
              isDone={item.isDone}
              style={{ backgroundColor: GlobalStyles.colors.done }}
              pathIconTodo={item.pathIconTodo}
            />
          ))}

          {tasksDone.length === 0 && <Text style={styles.message}>Aucune tâche effectuée</Text>}
        </View>
        <CategoriesList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    minHeight: 140,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default HomeScreen;
