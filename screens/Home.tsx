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

  console.log(tasks["tasks"]);

  return (
    <SafeAreaView>
      <FlatList
        data={tasks["tasks"]}
        renderItem={({ item }) => <TaskItem title={item.title} reward={item.reward} />}
        keyExtractor={(item) => item.id}
      />
      <Text>Ici seront affichés les cards</Text>
    </SafeAreaView>
  );
};
export default Home;
