import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, TaskItem, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";
import { Task } from "../store/slices/allTasksSlice";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [activatedTasks, setActivatedTasks] = useState([]);

  const { categoryName } = route.params;
  // let locallyTasksIndexes: Array<string>;

  // useEffect(() => {
  //   locallyTasksIndexes = activatedTasks.map((task: Task) => task.id);
  // }, [activatedTasks]);

  const allTasks = useSelector((state: RootState) => state.allTasksList);

  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  const addTasksInHomeScreen = () => {
    dispatch(addTask(activatedTasks));
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{categoryName}</Title>
      <FlatList
        data={categoryTasks}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            reward={item.reward}
            id={item.id}
            category={item.category}
            style={{ backgroundColor: GlobalStyles.colors.presentation }}
            isPresentation={true}
            setActivatedTasks={setActivatedTasks}
            activatedTasks={activatedTasks}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />

      <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={addTasksInHomeScreen} alternativeStyle={true}>
        Ajouter
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  title: {
    marginVertical: 15,
  },
});

export default CategoryScreen;
