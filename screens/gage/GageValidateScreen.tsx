import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Title } from "../../components";
import ROUTES from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Gage } from "../../types/Gage";
import { setGageInDatabase } from "../../store/slices/gagesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { decrementPointsInStore } from "../../store/slices/userSlice";
import { removeGageTaskId } from "../../store/slices/gagesSlice";

const GageValidateScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { gageToAddInDatabase, categoryGageSelection, gageDay, gageMonth, gageYear, gageDateString } = useSelector(
    (state: RootState) => state.gages
  );

  const gageToSaveInDatabase: Gage = {
    id: 0,
    title: gageToAddInDatabase.title,
    description: gageToAddInDatabase.description,
    is_done: false,
    cost: gageToAddInDatabase.cost,
    category: categoryGageSelection,
    day: gageDay,
    month: gageMonth,
    year: gageYear,
    date_string: gageDateString,
  };

  const handlePress = () => {
    dispatch(setGageInDatabase(gageToSaveInDatabase));
    dispatch(decrementPointsInStore({ points: gageToAddInDatabase.cost }));
    dispatch(removeGageTaskId());
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <View style={styles.container}>
      <Title titleType="h2">Voici un résumé du gage 😈</Title>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Titre:</Text>
        <Text style={styles.summaryText}>{gageToAddInDatabase.title}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Description:</Text>
        <Text style={styles.summaryText}>{gageToAddInDatabase.description}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Catégorie:</Text>
        <Text style={styles.summaryText}>{categoryGageSelection}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Coût:</Text>
        <Text style={styles.summaryText}>{gageToAddInDatabase.cost}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Date:</Text>
        <Text style={styles.summaryText}>{gageDateString}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>
        <Button onPress={handlePress}>Valider le gage</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  summaryTitle: {
    fontWeight: "bold",
    color: "white",
    marginRight: 8,
    flex: 1,
  },
  summaryText: {
    flex: 3,
    color: "white",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default GageValidateScreen;
