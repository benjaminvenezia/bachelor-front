import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
const ListCategories = () => {
  const { categoryGageSelection } = useSelector(
    (state: RootState) => state.gages,
  );
  const { categories } = useSelector((state: RootState) => state.categories);

  return (
    <View style={styles.wrapper}>
      {categories.map((item) => (
        <CategoryListItem
          key={item.id}
          active={item.category === categoryGageSelection ? true : false}
          {...item}
        />
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

export default ListCategories;
