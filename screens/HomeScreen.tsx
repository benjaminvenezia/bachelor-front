import { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskItem, Hr, DaysContainer, CategoriesList, Title } from "../components";
import { GlobalStyles } from "../constants/style";

const HomeScreen: FunctionComponent = () => {
  const storeActiveDay = useSelector((state: RootState) => state.day);
  const tasks = useSelector((state: RootState) => state.activeTasksList);

  const tasksNotDone = tasks["tasks"].filter((task) => !task.is_done && task.associated_day === storeActiveDay["activeDay"]);
  const tasksDone = tasks["tasks"].filter((task) => task.is_done && task.associated_day === storeActiveDay["activeDay"]);

  if (tasksDone.length === 0 && tasksNotDone.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <DaysContainer />
        <Title>Aucune tâche associée à ce jour!</Title>
        <Text>Choisissez une catégorie</Text>
        <Text>Nos Suggestions : button</Text>
        <CategoriesList />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <DaysContainer />
      <View style={styles.listContainer}>
        <FlatList
          data={tasksNotDone}
          renderItem={({ item }) => (
            <TaskItem title={item.title} reward={item.reward} id={item.id} category={item.category} associated_day={item.associated_day} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksNotDone.length === 0 && <Text style={styles.message}>Pas de tâches prévue aujourd'hui.</Text>}
      </View>

      <Hr />

      <View style={styles.listContainer}>
        <FlatList
          data={tasksDone}
          renderItem={({ item }) => (
            <TaskItem
              title={item.title}
              reward={item.reward}
              id={item.id}
              category={item.category}
              style={{ backgroundColor: GlobalStyles.colors.done }}
              associated_day={item.associated_day}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksDone.length === 0 && <Text style={styles.message}>Aucune tâche effectuée</Text>}
      </View>

      <CategoriesList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    minHeight: 140,
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default HomeScreen;
