import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, DaysSelectorContainer, TaskItemCategory, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../store/slices/allTasksSlice";
import { resetDays } from "../store/slices/daysToAddTasksSlice";
import { checkTaskIsPresent } from "../utils/checkTaskIsPresent";
//PLUTOT UTILISER https://www.npmjs.com/package/react-id-generator pour plus facilement sélectionner id et tout
import uuid from "react-native-uuid";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [activatedTasks, setActivatedTasks] = useState([]);

  const activeDays = useSelector((state: RootState) => state.daysToAddTasks);
  const allTasks = useSelector((state: RootState) => state.allTasksList);
  const activeTasksInHome = useSelector((state: RootState) => state.activeTasksList);

  const { categoryName } = route.params;

  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  const addTasksInHomeScreen = () => {
    let toPush: any = [];

    for (let i = 0; i < activatedTasks.length; i++) {
      for (let j = 0; j < activeDays["activeDays"].length; j++) {
        let taskToPush = { ...(activatedTasks[i] as Task) };
        taskToPush.id = uuid.v4().toString();
        taskToPush.associatedDay = activeDays["activeDays"][j];

        if (!checkTaskIsPresent(activeTasksInHome["activeTasks"], taskToPush)) {
          toPush.push(taskToPush);
        }
      }
    }

    dispatch(addTask(toPush));
    dispatch(resetDays(activatedTasks));
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>{categoryName}</Title>
        <FlatList
          data={categoryTasks}
          renderItem={({ item }) => (
            <TaskItemCategory
              title={item.title}
              reward={item.reward}
              id={item.id}
              category={item.category}
              style={{ backgroundColor: GlobalStyles.colors.presentation }}
              setActivatedTasks={setActivatedTasks}
              activatedTasks={activatedTasks}
              pathIconTodo={item.pathIconTodo}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        <DaysSelectorContainer />

        {activeDays["activeDays"].length > 0 && activatedTasks.length > 0 ? (
          <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => addTasksInHomeScreen()} alternativeStyle={false}>
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
