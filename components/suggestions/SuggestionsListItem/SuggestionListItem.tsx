import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
const SuggestionListItem = () => {
  return (
    <View>
      <Text style={styles.text}>SuggestionListItem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default SuggestionListItem;
