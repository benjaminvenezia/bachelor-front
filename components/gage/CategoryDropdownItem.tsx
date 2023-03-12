import { View, Text, StyleSheet, Pressable } from "react-native";
import { Category } from "../../store/slices/categoriesSlice";
import { useDispatch } from "react-redux";
import { setCategoryGageSelection } from "../../store/slices/categoriesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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

  return (
    <Pressable onPress={() => dispatch(setCategoryGageSelection({ categoryTitle: category }))}>
      <View style={[styles.container, props.active ? styles.active : {}]}>
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
  active: {
    backgroundColor: "red",
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryDropdownItem;
