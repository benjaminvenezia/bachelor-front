import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constants/routes";
import { CategoryListItemProps } from "./CategoryListItemProps.types";
import { AntDesign } from "@expo/vector-icons";

const CategoryListItem = ({ children }: CategoryListItemProps) => {
  const navigation = useNavigation<any>();
  const categoryName = children;

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTES.CATEGORY, { categoryName: categoryName })}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{children}</Text>
        <AntDesign name="pluscircle" size={30} color="gray" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    marginVertical: 5,
    width: "85%",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    color: "gray",
  },
  icon: {
    color: "black",
    width: 30,
    height: 30,
  },
});

export default CategoryListItem;
