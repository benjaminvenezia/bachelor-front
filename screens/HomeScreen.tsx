import { FunctionComponent, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskItem, Hr, DaysContainer, CategoriesList, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import { fetchTasks } from "../utils/http/httpTask";

const HomeScreen: FunctionComponent = () => {
  const storeActiveDay = useSelector((state: RootState) => state.day);
  const tasks = useSelector((state: RootState) => state.activeTasksList);
  const user = useSelector((state: RootState) => state.user);
  const tasksNotDone = tasks["activeTasks"].filter((task) => !task.isDone && task.associatedDay === storeActiveDay["activeDay"]);
  const tasksDone = tasks["activeTasks"].filter((task) => task.isDone && task.associatedDay === storeActiveDay["activeDay"]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getTasks() {
      fetchTasks(user.user.token, dispatch);
    }

    getTasks();
  }, []);

  if (tasksDone.length === 0 && tasksNotDone.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <DaysContainer />
        <Title>Salut {user.user.user.title} Aucune tâche associée à ce jour!</Title>
        <Text>Choisissez une catégorie</Text>
        <Text>Nos Suggestions : button</Text>
        <CategoriesList />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DaysContainer />

      <View style={styles.listContainer}>
        <FlatList
          data={tasksNotDone}
          renderItem={({ item }) => (
            <TaskItem title={item.title} reward={item.reward} id={item.id} isDone={item.isDone} pathIconTodo={item.pathIconTodo} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksNotDone.length === 0 && <Text style={styles.message}>Pas de tâches prévue aujourd'hui.</Text>}
      </View>
      <Hr />
      <View style={styles.listContainer}>
        <FlatList
          data={tasksDone}
          renderItem={({ item }) => (
            <TaskItem
              title={item.title}
              reward={item.reward}
              id={item.id}
              isDone={item.isDone}
              style={{ backgroundColor: GlobalStyles.colors.done }}
              pathIconTodo={item.pathIconTodo}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksDone.length === 0 && <Text style={styles.message}>Aucune tâche effectuée</Text>}
      </View>
      <CategoriesList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    minHeight: 140,
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default HomeScreen;
