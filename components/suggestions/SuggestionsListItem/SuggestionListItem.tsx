import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
const SuggestionListItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SuggestionListItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 3,
    width: "45%",
  },
  text: {
    color: "white",
  },
});

export default SuggestionListItem;
