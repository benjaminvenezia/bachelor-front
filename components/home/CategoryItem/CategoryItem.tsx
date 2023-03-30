import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constants/routes";
import { CategoryItemProps } from "./CategoryItemProps.types";

const CategoryItem = ({ children }: CategoryItemProps) => {
  const navigation = useNavigation<any>();
  const categoryName = children;

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTES.CATEGORY, { categoryName: categoryName })}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{children}</Text>
        <Image style={styles.icon} source={require("../../../assets/icons/navigation/arrow-right.png")} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 15,
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.muted,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CategoryItem;
