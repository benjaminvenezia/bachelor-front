import { View, Text, StyleSheet, Pressable } from "react-native";
import { Category } from "../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryGageSelection } from "../../store/slices/categoriesSlice";
import { RootState } from "../../store/store";

const CategoryDropdownItem = (props: Category) => {
  const { category, description, title } = props;
  const dispatch = useDispatch();
  // const gageStore = useSelector((state: RootState) => state.categories);

  // console.log(gageStore.categoryGageSelection);

  return (
    <Pressable onPress={() => dispatch(setCategoryGageSelection({ categoryTitle: category }))}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    borderColor: "black",
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryDropdownItem;
