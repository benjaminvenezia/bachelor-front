import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CategoryDropdownItem from "./CategoryDropdownItem";

const DropdownCategories = () => {
  const categories = useSelector((state: RootState) => state.categories);

  return (
    <View>
      <FlatList
        data={categories["categories"]}
        renderItem={({ item }) => {
          return <CategoryDropdownItem {...item} />;
        }}
        keyExtractor={(item): any => item.id}
      />
    </View>
  );
};
export default DropdownCategories;
