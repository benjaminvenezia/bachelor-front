import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../types/Group";
import { useEffect } from "react";
import { getGroupFromDatabase } from "../store/slices/groupSlice";
import { Title, GagesTeam } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { GlobalStyles } from "../constants/style";
import { fetchGagesFromDatabase } from "../store/slices/gagesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const TeamScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const group = useSelector((state: RootState) => state.group);

  const { delta, GroupName, user1Points, user2Points, user1Name, user2Name, winner, looser }: Group = group.group;

  useEffect(() => {
    dispatch(fetchGagesFromDatabase());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        dispatch(getGroupFromDatabase());
      };

      getGroup();
    }, [])
  );

  return (
    <SafeAreaView>
      <Title titleType="h1">{GroupName}</Title>
      <Text style={styles.text}>
        {user1Name} a marqué {user1Points} points cette semaine.
      </Text>
      <Text style={styles.text}>
        {user2Name} a marqué {user2Points} points cette semaine.
      </Text>
      <Text style={styles.text}>
        {looser} est en train de perdre, {winner} est en tête de {delta} points
      </Text>

      <Title titleType="h2">Gages</Title>

      <GagesTeam />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});
export default TeamScreen;
