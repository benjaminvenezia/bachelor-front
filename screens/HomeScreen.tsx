import { FunctionComponent } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { RootState } from "../store/store";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskItem, DaysContainer, CategoriesList, Title, NoTasksGuide } from "../components";
import { GlobalStyles } from "../constants/style";
import { getGroupFromDatabase } from "../store/slices/groupSlice";
import { fetchDefaultGagesFromDatabase } from "../store/slices/gagesSlice";
import { fetchDefaultTasksFromDatabase } from "../store/slices/defaultTasksSlice";
import { fetchTasksFromDatabase } from "../store/slices/tasksSlice";
import { fetchGagesFromDatabase } from "../store/slices/gagesSlice";
import { fetchCurrentUser } from "../store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen: FunctionComponent = ({ navigation }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupFromDatabase());
    dispatch(fetchTasksFromDatabase());
    dispatch(fetchGagesFromDatabase());
    dispatch(fetchDefaultGagesFromDatabase());
    dispatch(fetchDefaultTasksFromDatabase());
    dispatch(fetchCurrentUser());
  }, []);

  const { activeDay } = useSelector((state: RootState) => state.day);
  const { tasks, isLoading, isAnErrorTogglingTheTask } = useSelector((state: RootState) => state.tasks);

  let tasksNotDone = tasks.filter((task) => !task.is_done && task.associated_day === activeDay);
  let tasksDone = tasks.filter((task) => task.is_done && task.associated_day === activeDay);

  if (isLoading) {
    return <Text>Chargement ...</Text>;
  }

  if (tasksDone.length === 0 && tasksNotDone.length === 0) {
    return <NoTasksGuide />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DaysContainer />
      <ScrollView>
        <View style={styles.listContainer}>
          {tasksNotDone.map((item) => (
            <TaskItem key={item.id} {...item} />
          ))}

          {tasksNotDone.length === 0 && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Travail terminé!</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Image style={styles.image} source={require("../assets/images/hr-menu.png")} />

          <View style={styles.listContainer}>
            {tasksDone.map((item) => (
              <TaskItem key={item.id} {...item} />
            ))}
            {tasksDone.length === 0 && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>Encore du travail?</Text>
              </View>
            )}
            {isAnErrorTogglingTheTask ? <Title titleType="h5">Une erreur a eu lieu lors du changement d'état de la tâche.</Title> : ""}
          </View>
          <CategoriesList />
          <ImageBackground style={styles.background} source={require("../assets/images/menu-background.png")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 140,
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
  image: {
    position: "absolute",
    top: -30,
    zIndex: -1,
    width: "100%",
    height: 30,
  },
  background: {
    position: "absolute",
    top: 0,
    zIndex: -3,
    width: "100%",
    height: 600,
    resizeMode: "stretch",
  },
  footer: {
    marginTop: 100,
    position: "relative",
    paddingVertical: 50,
  },
});

export default HomeScreen;
