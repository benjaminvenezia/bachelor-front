import { View, Text, StyleSheet, Pressable } from "react-native";
import { Category } from "../../store/slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { setCategoryGageSelection } from "../../store/slices/categoriesSlice";
import { filterGageTask } from "../../store/slices/gagesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import categories from "../../constants/categories";

type Props = {
  id: number;
  category: string;
  description: string;
  title: string;
  active: boolean;
};

const CategoryDropdownItem = (props: Props) => {
  const dispatch = useDispatch();
  const { id, category, description, title, active }: Props = props;

  const handlePress = () => {
    dispatch(setCategoryGageSelection({ categoryTitle: category }));
    dispatch(filterGageTask({ category: category }));
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.wrapper, props.active ? styles.active : {}]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    padding: 15,
    borderColor: "black",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 40,
  },
  active: {
    backgroundColor: "lightgray",
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryDropdownItem;
