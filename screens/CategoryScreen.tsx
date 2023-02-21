import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, DaysSelectorContainer, TaskItemCategory, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask, setTasks } from "../store/slices/activeTasksSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../store/slices/allTasksSlice";
import { resetDays } from "../store/slices/daysToAddTasksSlice";
import { checkTaskIsPresent } from "../utils/checkTaskIsPresent";
//PLUTOT UTILISER https://www.npmjs.com/package/react-id-generator pour plus facilement sélectionner id et tout
import uuid from "react-native-uuid";
import axios from "axios";

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
    const daysLabels = days.map((item) => item.associatedDay);

    return daysLabels;
  };

  const getTasksForEachDaysSelected = () => {
    let toPush: any = [];

    for (let i = 0; i < activatedTasks.length; i++) {
      for (let j = 0; j < activeDays["activeDays"].length; j++) {
        let taskToPush = { ...(activatedTasks[i] as Task) };
        taskToPush.id = uuid.v4().toString();
        taskToPush.associatedDay = activeDays["activeDays"][j];

        if (!checkTaskIsPresent(activeTasksInHome["activeTasks"], taskToPush)) {
          toPush.push(taskToPush);
          setActivatedTasks([]);
        }
      }
    }

    return toPush;
  };

  const addTasksInDatabase = async (tasksArray: Task[]) => {
    //Je préférerais recourir à 1 seul call api et ne pas boucler, mais pour le moment ça ira.
    tasksArray.map((task) => {
      axios({
        method: "post",
        url: "http://localhost:8000/api/tasks",
        data: {
          title: task.title,
          description: "rédigé manuellment",
          category: task.category,
          reward: task.reward,
          isDone: task.isDone,
          associated_day: task.associatedDay,
        },
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const addTasksInHomeScreen = (tasks: Task[]) => {
    dispatch(addTask(tasks));
    dispatch(resetDays());
    navigation.navigate(ROUTES.HOME);
  };

  const handleClick = () => {
    const tasksExtracted = getTasksForEachDaysSelected();
    addTasksInHomeScreen(tasksExtracted);
    addTasksInDatabase(tasksExtracted);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>{categoryName}</Title>
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
                pathIconTodo={item.pathIconTodo}
                days={daysLabels}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        <DaysSelectorContainer />

        {activeDays["activeDays"].length > 0 && activatedTasks.length > 0 ? (
          <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => handleClick()} alternativeStyle={false}>
            Ajouter
          </Button>
        ) : (
          <>
            <Text>Merci de choisir au moins un jour et une tâche</Text>
            <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => {}} alternativeStyle={true}>
              Invalide
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {},
  title: {
    marginVertical: 15,
  },
});

export default CategoryScreen;
