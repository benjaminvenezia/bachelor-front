import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, DaysSelectorContainer, TaskItemCategory, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../types/Task";
import { resetDays } from "../store/slices/daysToAddTasksSlice";
import { checkTaskIsPresent } from "../utils/checkTaskIsPresent";
//PLUTOT UTILISER https://www.npmjs.com/package/react-id-generator pour plus facilement sélectionner id et tout
import uuid from "react-native-uuid";
import { setTasksInDatabase } from "../utils/http/httpTask";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [activatedTasks, setActivatedTasks] = useState([]);

  const activeDays = useSelector((state: RootState) => state.daysToAddTasks);
  const allTasks = useSelector((state: RootState) => state.allTasksList);
  const activeTasksInHome = useSelector((state: RootState) => state.activeTasksList);
  const user = useSelector((state: RootState) => state.user);

  const { categoryName } = route.params;

  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  const getDaysAssociated = (title: string) => {
    const days = activeTasksInHome["activeTasks"].filter((task: Task) => task.title === title);
    const daysLabels = days.map((item) => item.associated_day);

    return daysLabels;
  };

  const getTasksForEachDaysSelected = () => {
    let toPush: Task[] = [];

    for (let i = 0; i < activatedTasks.length; i++) {
      for (let j = 0; j < activeDays["activeDays"].length; j++) {
        const taskToExtract: Task = activatedTasks[i];
        let taskToPush = { ...taskToExtract };
        taskToPush.id = uuid.v4().toString();
        taskToPush.associated_day = activeDays["activeDays"][j];
        taskToPush.path_icon_todo = taskToExtract.path_icon_todo;

        if (!checkTaskIsPresent(activeTasksInHome["activeTasks"], taskToPush)) {
          toPush.push(taskToPush);
          setActivatedTasks([]);
        }
      }
    }

    return toPush;
  };

  const setTasksInHomeScreen = (tasks: Task[]) => {
    dispatch(addTask(tasks));
    dispatch(resetDays());
    navigation.navigate(ROUTES.HOME);
  };

  const handleClick = () => {
    const tasksExtracted = getTasksForEachDaysSelected();

    setTasksInHomeScreen(tasksExtracted);
    setTasksInDatabase(tasksExtracted, user.user.token);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          {categoryName}
        </Title>
        <FlatList
          data={categoryTasks}
          renderItem={({ item }) => {
            const daysLabels = getDaysAssociated(item.title);

            return (
              <TaskItemCategory
                title={item.title}
                reward={item.reward}
                id={item.id}
                category={item.category}
                style={{ backgroundColor: GlobalStyles.colors.presentation }}
                setActivatedTasks={setActivatedTasks}
                activatedTasks={activatedTasks}
                path_icon_todo={item.path_icon_todo}
                days={daysLabels}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        <DaysSelectorContainer />
        <View style={styles.containerButton}>
          {activeDays["activeDays"].length > 0 && activatedTasks.length > 0 ? (
            <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => handleClick()} alternativeStyle={false}>
              Ajouter
            </Button>
          ) : (
            <View style={styles.containerInvalid}>
              <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => {}} alternativeStyle={true}>
                Choisir tâches et jours
              </Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: GlobalStyles.colors.background,
  },
  container: {
    flex: 1,
  },
  containerButton: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInvalid: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
  button: {},
  title: {
    marginVertical: 15,
  },
});

export default CategoryScreen;
