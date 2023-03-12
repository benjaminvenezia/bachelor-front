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
          return <CategoryDropdownItem active={item.category === categories.categoryGageSelection ? true : false} {...item} />;
        }}
        keyExtractor={(item): any => item.id}
        numColumns={3}
      />
    </View>
  );
};
export default DropdownCategories;
