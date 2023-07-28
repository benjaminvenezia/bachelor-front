import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constants/routes";
import { CategoryListItemProps } from "./CategoryListItemProps.types";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryListItem = ({ children }: CategoryListItemProps) => {
  const navigation = useNavigation<any>();
  const categoryName = children;

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate(ROUTES.CATEGORY, { categoryName: categoryName })
      }
    >
      <View style={styles.subContainer}>
        <Text style={styles.text}>{children}</Text>
        <MaterialIcons name="read-more" size={30} color="white" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    width: "100%",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderColor: "white",
    borderBottomWidth: 2,
    backgroundColor: "black",
    opacity: 0.7,
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    color: "white",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CategoryListItem;
