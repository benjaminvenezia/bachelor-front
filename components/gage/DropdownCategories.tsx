import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CategoryDropdownItem from "./CategoryDropdownItem";

const DropdownCategories = () => {
  const categoriesStore = useSelector((state: RootState) => state.categories);

  return (
    <View style={styles.wrapper}>
      {categoriesStore.categories.map((item) => (
        <CategoryDropdownItem key={item.id} active={item.category === categoriesStore.categoryGageSelection ? true : false} {...item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
});

export default DropdownCategories;
