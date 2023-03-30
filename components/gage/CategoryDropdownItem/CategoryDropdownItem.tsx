import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { setCategoryGageSelection } from "../../../store/slices/categoriesSlice";
import { filterGageTask } from "../../../store/slices/gagesSlice";
import { GlobalStyles } from "../../../constants/style";
import { categoryDropdownItemProps } from "./CategoryDropdownItemProps.types";

const CategoryDropdownItem = (props: categoryDropdownItemProps) => {
  const dispatch = useDispatch();
  const { category, title, active }: categoryDropdownItemProps = props;

  const handlePress = () => {
    dispatch(setCategoryGageSelection({ categoryTitle: category }));
    dispatch(filterGageTask({ category: category }));
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.wrapper, active ? styles.active : {}]}>
        <Text style={[styles.text, active ? styles.textActive : {}]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    padding: 15,
    borderColor: "white",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 40,
  },
  active: {
    backgroundColor: GlobalStyles.colors.primary,
    borderColor: GlobalStyles.colors.primary,
  },
  textActive: {
    color: "black",
  },
  text: {
    textAlign: "center",
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});

export default CategoryDropdownItem;
