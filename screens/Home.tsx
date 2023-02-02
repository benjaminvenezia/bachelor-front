import { FunctionComponent } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../store/slices/tasksListSlice";
import { TaskItem, Hr, DaysContainer } from "../components";
import { GlobalStyles } from "../constants/style";

const Home: FunctionComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasksList);

  const tasksNotDone = tasks["tasks"].filter((task) => !task.is_done);
  const tasksDone = tasks["tasks"].filter((task) => task.is_done);

  return (
    <SafeAreaView>
      <DaysContainer />
      <View>
        <FlatList
          data={tasksNotDone}
          renderItem={({ item }) => <TaskItem title={item.title} reward={item.reward} id={item.id} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksNotDone.length === 0 && <Text>Pas de tâches prévue aujourd'hui.</Text>}
      </View>

      <Hr />

      <View>
        <FlatList
          data={tasksDone}
          renderItem={({ item }) => (
            <TaskItem title={item.title} reward={item.reward} id={item.id} style={{ backgroundColor: GlobalStyles.colors.done }} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />

        {tasksDone.length === 0 && <Text>Aucune tâche effectuée</Text>}
      </View>
    </SafeAreaView>
  );
};
export default Home;
