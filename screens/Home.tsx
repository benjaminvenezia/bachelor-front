import { FunctionComponent } from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../store/slices/tasksListSlice";
import { TaskItem } from "../components";

const Home: FunctionComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasksList);
  const tasksNotDone = tasks["tasks"].filter((task) => !task.is_done);
  const tasksDone = tasks["tasks"].filter((task) => task.is_done);

  return (
    <SafeAreaView>
      <FlatList
        data={tasksNotDone}
        renderItem={({ item }) => <TaskItem title={item.title} reward={item.reward} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />

      <Text>Hr</Text>

      <FlatList
        data={tasksDone}
        renderItem={({ item }) => <TaskItem title={item.title} reward={item.reward} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </SafeAreaView>
  );
};
export default Home;
