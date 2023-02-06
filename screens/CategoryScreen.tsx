import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, DaysSelectorContainer, TaskItem, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [activatedTasks, setActivatedTasks] = useState([]);

  const { categoryName } = route.params;

  const allTasks = useSelector((state: RootState) => state.allTasksList);

  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  const addTasksInHomeScreen = () => {
    dispatch(addTask(activatedTasks));
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
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
              associatedDay={item.associatedDay}
              pathIconTodo={item.pathIconTodo}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={addTasksInHomeScreen} alternativeStyle={true}>
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
