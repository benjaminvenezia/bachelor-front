import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CategoryDropdownItem from "../CategoryDropdownItem/CategoryDropdownItem";

const DropdownCategories = () => {
  const { categories, categoryGageSelection } = useSelector((state: RootState) => state.categories);

  return (
    <View style={styles.wrapper}>
      {categories.map((item) => (
        <CategoryDropdownItem key={item.id} active={item.category === categoryGageSelection ? true : false} {...item} />
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
