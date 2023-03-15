import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../store/slices/groupSlice";
import { useEffect } from "react";
import { getGroupFromDatabase } from "../utils/http/httpGroup";
import { Title } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { GlobalStyles } from "../constants/style";
import { fetchGagesFromDatabase } from "../utils/http/httpGage";

const TeamScreen = () => {
  const dispatch = useDispatch();
  const group = useSelector((state: RootState) => state.group);
  const gagesStore = useSelector((state: RootState) => state.gages);
  const user = useSelector((state: RootState) => state.user);
  const { delta, GroupName, user1Points, user2Points, user1Name, user2Name, winner, looser }: Group = group.group[0];

  useEffect(() => {
    const getGages = async () => {
      fetchGagesFromDatabase(user.user.token, dispatch);
    };

    getGages();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        getGroupFromDatabase(user.user.token, dispatch);
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

      {gagesStore.gages.map((item, index) => {
        return (
          <Text style={styles.text} key={index}>
            {item.title}
            {item.day}
            {item.year}
            {item.user_name}
          </Text>
        );
      })}
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
