import { View, Text } from "react-native";
import { Category } from "../../store/slices/categoriesSlice";

const CategoryDropdownItem = (props: Category) => {
  const { category, description, title } = props;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
export default CategoryDropdownItem;
