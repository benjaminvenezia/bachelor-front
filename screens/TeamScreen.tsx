import { View, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../store/slices/groupSlice";
import { useEffect } from "react";
import { getGroupFromDatabase } from "../utils/http/httpGroup";
import { Title } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const TeamScreen = () => {
  const dispatch = useDispatch();
  const group = useSelector((state: RootState) => state.group);
  const user = useSelector((state: RootState) => state.user);
  const { delta, GroupName, user1Points, user2Points, user1Name, user2Name, winner, looser }: Group = group.group[0];

  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        getGroupFromDatabase(user.user.token, dispatch);
      };

      getGroup();
    }, [])
  );

  console.log("In TeamScreen ", group);

  return (
    <SafeAreaView>
      <Title>{GroupName}</Title>
      <Text>
        {user1Name} a marqué {user1Points} points cette semaine.
      </Text>
      <Text>
        {user2Name} a marqué {user2Points} points cette semaine.
      </Text>
      <Text>
        {looser} est en train de perdre, {winner} est en tête de {delta} points
      </Text>
    </SafeAreaView>
  );
};
export default TeamScreen;
