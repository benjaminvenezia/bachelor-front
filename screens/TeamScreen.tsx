import { View, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../store/slices/groupSlice";
import { useEffect } from "react";
import { getGroupFromDatabase } from "../utils/http/httpGroup";
import { Title } from "../components";

const TeamScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getGroup() {
      getGroupFromDatabase(user.user.token, dispatch);
    }

    getGroup();
  }, []);

  const group = useSelector((state: RootState) => state.group);
  const user = useSelector((state: RootState) => state.user);
  const { delta, GroupName, user1Points, user2Points, winner, looser }: Group = group.group[0];

  console.log("In TeamScreen ", group);

  return (
    <SafeAreaView>
      <Title>{GroupName}</Title>
      <Text>
        {looser} est en train de perdre, {winner} est en tête de {delta} points
      </Text>
    </SafeAreaView>
  );
};
export default TeamScreen;
