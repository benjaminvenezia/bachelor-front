import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button, PointsLabel, Title } from "../../components";
import ROUTES from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Gage } from "../../types/Gage";
import { setGageInDatabase } from "../../store/slices/gagesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  decrementPointsInStore,
  setUserPointsInDatabase,
} from "../../store/slices/userSlice";
import { removeGageTaskId } from "../../store/slices/gagesSlice";
import ToastPopUp from "../../utils/ToastPopUp";

const GageValidateScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    gageToAddInDatabase,
    categoryGageSelection,
    gageDay,
    gageMonth,
    gageYear,
    gageDateString,
  } = useSelector((state: RootState) => state.gages);

  const { user } = useSelector((state: RootState) => state.user);

  const gageToSaveInDatabase: Gage = {
    id: 0,
    title: gageToAddInDatabase.title,
    description: gageToAddInDatabase.description,
    is_done: false,
    cost: gageToAddInDatabase.cost,
    category: categoryGageSelection !== null ? categoryGageSelection : "",
    day: gageDay !== null ? gageDay : 0,
    month: gageMonth !== null ? gageMonth : 0,
    year: gageYear !== null ? gageYear : 0,
    date_string: gageDateString !== null ? gageDateString : "",
  };

  const handlePress = () => {
    dispatch(setGageInDatabase(gageToSaveInDatabase));
    dispatch(decrementPointsInStore({ points: gageToAddInDatabase.cost }));
    dispatch(removeGageTaskId());
    dispatch(
      setUserPointsInDatabase({
        id: user.id,
        points: user.points - gageToAddInDatabase.cost,
      }),
    );
    ToastPopUp(`Le gage a été validé. 😈`);
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
        <Text style={styles.summaryText}>
          {gageToAddInDatabase.description}
        </Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Catégorie:</Text>
        <Text style={styles.summaryText}>{categoryGageSelection}</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Coût:</Text>
        <Text style={styles.summaryText}>
          {gageToAddInDatabase.cost} <PointsLabel />
        </Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Date:</Text>
        <Text style={styles.summaryText}>{gageDateString}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          style={styles.btnLeft}
          size="LG"
          onPress={() => navigation.goBack()}
        >
          Retour
        </Button>
        <Button size="LG" onPress={handlePress}>
          Valider le gage
        </Button>
      </View>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bang.png")}
      />
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
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingBottom: 10,
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
  image: {
    width: 350,
    height: 350,
    marginTop: 10,
  },
  btnLeft: {
    marginEnd: 10,
  },
});

export default GageValidateScreen;
