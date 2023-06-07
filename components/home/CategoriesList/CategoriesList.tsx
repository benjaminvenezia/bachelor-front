import { View, StyleSheet } from "react-native";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
import CATEGORIES from "../../../constants/categories";

const CategoriesList = () => {
  return (
    <View style={styles.container}>
      {Object.values(CATEGORIES).map((category, index) => {
        return <CategoryListItem key={index}>{category}</CategoryListItem>;
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
