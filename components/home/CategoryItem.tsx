import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../constants/routes";

type Props = {
  children: string;
};

const CategoryItem = ({ children }: Props) => {
  const navigation = useNavigation<any>();
  const categoryName = children;

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTES.CATEGORY, { categoryName: categoryName })}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{children}</Text>
        <Image source={require("../../assets/icons/navigation/arrow.png")} />
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
    fontWeight: "bold",
  },
});

export default CategoryItem;
