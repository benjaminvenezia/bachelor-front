import { View, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";
import CATEGORIES from "../../constants/categories";

const CategoriesList = () => {
  return (
    <View style={styles.container}>
      {Object.values(CATEGORIES).map((category, index) => {
        return <CategoryItem key={index}>{category}</CategoryItem>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
export default CategoriesList;
