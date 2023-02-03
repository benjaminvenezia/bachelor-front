import { View, StyleSheet } from "react-native";
import { CategoryItem } from "../";
import CATEGORIES from "../../constants/categories";

const CategoriesList = () => {
  return (
    <View style={styles.container}>
      {Object.values(CATEGORIES).map((category, index) => {
        return <CategoryItem>{category}</CategoryItem>;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
export default CategoriesList;
