import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";

const GageTaskItem = ({ children }: any) => {
  return (
    <Pressable style={styles.wrapper}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 100,
    width: "50%",
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
});
export default GageTaskItem;
