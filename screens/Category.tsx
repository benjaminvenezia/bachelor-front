import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TaskItem } from "../components";
import { FlatList } from "react-native-gesture-handler";
import { GlobalStyles } from "../constants/style";

const Category = ({ navigation, route }: any) => {
  const { categoryName } = route.params;
  const allTasks = useSelector((state: RootState) => state.allTasksList);
  const categoryTasks = allTasks["tasks"].filter((task) => task.category === categoryName);

  return (
    <View>
      <Text>{categoryName}</Text>
      <FlatList
        data={categoryTasks}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            reward={item.reward}
            id={item.id}
            style={{ backgroundColor: GlobalStyles.colors.presentation }}
            isPresentation={true}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};
export default Category;
