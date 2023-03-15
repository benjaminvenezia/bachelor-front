import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";
import GageTeamItem from "./GageTeamItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ScrollView } from "react-native-gesture-handler";

const GagesTeam = () => {
  const gagesStore = useSelector((state: RootState) => state.gages);

  return (
    <ScrollView>
      {gagesStore.gages.map((item, index) => {
        return <GageTeamItem key={index} {...item} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});
export default GagesTeam;
