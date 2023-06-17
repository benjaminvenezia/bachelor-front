import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Group } from "../../types/Group";
import { getGroupFromDatabase } from "../../store/slices/groupSlice";
import { Title, GagesTeam, Button } from "../../components";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ROUTES from "../../constants/routes";
import { Dimensions } from "react-native";

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

const TeamScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { group } = useSelector((state: RootState) => state.group);

  const { GroupName, user1Points, delta, user2Points, user1Name, user2Name, winner, looser }: Group | any = group;

  useFocusEffect(
    React.useCallback(() => {
      const getGroup = async () => {
        dispatch(getGroupFromDatabase());
      };

      getGroup();
    }, [])
  );

  return GroupName && user1Points && user2Points && delta && winner ? (
    <SafeAreaView>
      <Title titleType="h1">{GroupName}</Title>

      <LineChart
        data={{
          labels: [user1Name, user2Name],
          datasets: [
            {
              data: [user1Points, user2Points],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#000000",
          backgroundGradientFrom: "#000000",
          backgroundGradientTo: "#515151",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
      />

      <Text style={styles.text}>
        {looser} est en train de perdre, {winner} est en tête de {delta} points
      </Text>

      <Button
        onPress={() => {
          navigation.navigate(ROUTES.GAGE_TEAM);
        }}
        size="XL"
      >
        Voir les Gages
      </Button>
    </SafeAreaView>
  ) : (
    ""
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
    marginBottom: 10,
  },
});
export default TeamScreen;
