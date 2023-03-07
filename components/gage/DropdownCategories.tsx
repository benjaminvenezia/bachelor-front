import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DropdownCategories = () => {
  const categories = useSelector((state: RootState) => state.categories);
  return (
    <View>
      <Text>DropdownCategories</Text>
    </View>
  );
};
export default DropdownCategories;
