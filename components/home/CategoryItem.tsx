import { Text, View, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

type Props = {
  children: string;
};

const CategoryItem = ({ children }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => alert(1)}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{children}</Text>
        <Text>-D</Text>
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
