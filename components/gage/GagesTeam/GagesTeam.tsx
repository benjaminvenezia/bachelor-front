import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import GageTeamItem from "../GageTeamItem/GageTeamItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ScrollView } from "react-native-gesture-handler";
import Title from "../../ui/Title/Title";

const GagesTeam = () => {
  const { gagesAssociatedToUsers } = useSelector((state: RootState) => state.gages);

  return (
    <ScrollView>
      {gagesAssociatedToUsers.length > 0 ? (
        gagesAssociatedToUsers.map((item, index) => {
          return <GageTeamItem key={index} {...item} />;
        })
      ) : (
        <Title titleType="h5">Aucun gage n'a été assigné</Title>
      )}
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
