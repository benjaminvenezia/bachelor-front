import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, DaysSelectorContainer, TaskItemCategory, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../store/slices/allTasksSlice";
import { resetDays } from "../store/slices/daysToAddTasksSlice";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [activatedTasks, setActivatedTasks] = useState([]);
  const activeDays = useSelector((state: RootState) => state.daysToAddTasks);
  const allTasks = useSelector((state: RootState) => state.allTasksList);

  const { categoryName } = route.params;

  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  const addTasksInHomeScreen = () => {
    let toPush: any = [];

    for (let i = 0; i < activatedTasks.length; i++) {
      for (let j = 0; j < activeDays["activeDays"].length; j++) {
        let taskToPush = { ...(activatedTasks[i] as Task) };

        taskToPush.id = Math.floor(Math.random() * 1000).toString();
        taskToPush.associatedDay = activeDays["activeDays"][j];

        toPush.push(taskToPush);
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

        <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={() => addTasksInHomeScreen()} alternativeStyle={true}>
          Ajouter
        </Button>

        <DaysSelectorContainer />
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
