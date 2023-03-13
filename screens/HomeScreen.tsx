import { FunctionComponent, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
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
  const tasksNotDone = tasks["activeTasks"].filter((task) => !task.is_done && task.associated_day === storeActiveDay["activeDay"]);
  const tasksDone = tasks["activeTasks"].filter((task) => task.is_done && task.associated_day === storeActiveDay["activeDay"]);

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
        <Title titleType="h1">Salut {user?.user.user.name} Aucune tâche associée à ce jour!</Title>
        <Text style={styles.text}>Vous pouvez vous rendre dans une catégorie ci-dessous pour ajouter vos premières tâches </Text>
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
              is_done={item.is_done}
              path_icon_todo={item.path_icon_todo}
            />
          ))}

          {tasksNotDone.length === 0 && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Pas de tâches prévue aujourd'hui.</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Image style={styles.image} source={require("../assets/images/hr-menu.png")} />

          <View style={styles.listContainer}>
            {tasksDone.map((item) => (
              <TaskItem
                key={item.id}
                title={item.title}
                reward={item.reward}
                id={item.id}
                is_done={item.is_done}
                style={{ backgroundColor: GlobalStyles.colors.done }}
                path_icon_todo={item.path_icon_todo}
              />
            ))}
            {tasksDone.length === 0 && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>Aucune tâche effectuée</Text>
              </View>
            )}
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
    position: "relative",
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
    // borderColor: "white",
    // borderWidth: 4,
  },
});

export default HomeScreen;
