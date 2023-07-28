import { View, Text } from "react-native";
import SuggestionListItem from "../SuggestionsListItem/SuggestionListItem";

const SuggestionsList = () => {
  return (
    <View>
      <SuggestionListItem />
      <SuggestionListItem />
      <SuggestionListItem />
      <SuggestionListItem />
    </View>
  );
};
export default SuggestionsList;
