import { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TaskItem, Title } from "../components";
import { GlobalStyles } from "../constants/style";
import ROUTES from "../constants/routes";
import { addTask } from "../store/slices/activeTasksSlice";

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
    <View>
      <Title>{categoryName}</Title>
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

      <Pressable onPress={addTasksInHomeScreen}>
        <Text>Ajouter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: GlobalStyles.fonts.h1,
    marginBottom: 10,
  },
});

export default CategoryScreen;
