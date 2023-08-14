import { View, Text, FlatList, SafeAreaView } from "react-native";
import SuggestionListItem from "../SuggestionsListItem/SuggestionListItem";

const suggestions = [
  {
    id: 1,
    title: "Suggestion 1",
  },
  {
    id: 2,
    title: "Suggestion 2",
  },
  {
    id: 3,
    title: "Suggestion 3",
  },
];

const SuggestionsList = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={suggestions}
        renderItem={({ item }) => {
          return <SuggestionListItem />;
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};
export default SuggestionsList;
