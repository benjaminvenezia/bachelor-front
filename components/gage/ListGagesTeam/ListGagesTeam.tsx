import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import GageTeamItem from "../GageTeamListItem/GageTeamListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ScrollView } from "react-native-gesture-handler";
import Title from "../../ui/Title/Title";

const ListGagesTeam = () => {
  const { gagesAssociatedToUsers } = useSelector(
    (state: RootState) => state.gages,
  );

  const gagesAssociatedToUsersNotDone = gagesAssociatedToUsers.filter(
    (gage) => !gage.is_done,
  );

  return (
    <ScrollView>
      {gagesAssociatedToUsersNotDone.length > 0 ? (
        gagesAssociatedToUsers.map((item, index) => {
          return !item.is_done ? <GageTeamItem key={index} {...item} /> : "";
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
export default ListGagesTeam;
