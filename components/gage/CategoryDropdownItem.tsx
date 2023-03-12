import { View, Text, StyleSheet, Pressable } from "react-native";
import { Category } from "../../store/slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { setCategoryGageSelection } from "../../store/slices/categoriesSlice";

const CategoryDropdownItem = (props: Category) => {
  const { category, description, title } = props;
  const dispatch = useDispatch();

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
    borderWidth: 2,
    padding: 15,
    borderColor: "black",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryDropdownItem;
