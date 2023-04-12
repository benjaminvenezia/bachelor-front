import { View, StyleSheet } from "react-native";
import { GagesTeam, Title, GagesTeamsFilters } from "../../components";

const GagesTeamScreen = () => {
  return (
    <View>
      <Title titleType="h2">Gages</Title>
      <GagesTeamsFilters />
      <GagesTeam />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default GagesTeamScreen;
