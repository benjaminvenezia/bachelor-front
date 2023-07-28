import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Button,
  DaysSelectorContainer,
  TaskItemCategory,
  Title,
} from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTask } from "../types/DefaultTask";
import { resetDays } from "../store/slices/daysToAddTasksSlice";
import { checkTaskIsPresent } from "../utils/checkTaskIsPresent";
import uuid from "react-native-uuid";
import { setTasksInDatabase, addTask } from "../store/slices/tasksSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [activatedTasks, setActivatedTasks] = useState([]);

  const { activeDays } = useSelector(
    (state: RootState) => state.daysToAddTasks,
  );
  const { defaultTasks } = useSelector(
    (state: RootState) => state.defaultTasks,
  );
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const { categoryName } = route.params;
  const categoryTasks = defaultTasks.filter(
    (task: DefaultTask) => task.category === categoryName,
  );

  const getDaysAssociated = (title: string) => {
    const days = tasks.filter((task: DefaultTask) => task.title === title);
    const daysLabels = days.map((item) => item.associated_day);

    return daysLabels;
  };

  const getTasksForEachDaysSelected = () => {
    let toPush: DefaultTask[] = [];

    for (let i = 0; i < activatedTasks.length; i++) {
      for (let j = 0; j < activeDays.length; j++) {
        const taskToExtract: DefaultTask = activatedTasks[i];
        let taskToPush: DefaultTask = { ...taskToExtract };
        taskToPush.id = uuid.v4().toString();
        taskToPush.associated_day = activeDays[j];
        taskToPush.path_icon_todo = taskToExtract.path_icon_todo;

        //Attention, tasks est ptetre faux
        if (!checkTaskIsPresent(tasks, taskToPush)) {
          toPush.push(taskToPush);
          setActivatedTasks([]);
        }
      }
    }

    return toPush;
  };

  const ToastAddTask = () => {
    Toast.show({
      type: "success",
      text1: `Tâche(s) ajouté(es)!`,
      position: "bottom",
      bottomOffset: 120,
    });
  };

  const setTasksInHomeScreen = (tasks: DefaultTask[]) => {
    dispatch(addTask(tasks));
    dispatch(resetDays());
    navigation.navigate(ROUTES.HOME);
  };

  const handleClick = () => {
    const tasksExtracted = getTasksForEachDaysSelected();

    setTasksInHomeScreen(tasksExtracted);
    dispatch(setTasksInDatabase(tasksExtracted));
    ToastAddTask();
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
          {activeDays.length > 0 && activatedTasks.length > 0 ? (
            <Button
              style={styles.button}
              size={GlobalStyles.buttons.xl}
              onPress={() => handleClick()}
              alternativeStyle={false}
            >
              Ajouter
            </Button>
          ) : (
            <View style={styles.containerInvalid}>
              <Button
                style={styles.button}
                size={GlobalStyles.buttons.xl}
                onPress={() => {}}
                alternativeStyle={true}
              >
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
