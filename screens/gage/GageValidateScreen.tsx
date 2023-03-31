import { View, Text } from "react-native";
import { Button, Title } from "../../components";
import ROUTES from "../../constants/routes";
import day from "react-native-calendars/src/calendar/day";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Gage } from "../../types/Gage";
import { setGageInDatabase } from "../../store/slices/gagesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const GageValidateScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { gageToAddInDatabase } = useSelector((state: RootState) => state.gages);
  const categoriesStore = useSelector((state: RootState) => state.categories);

  const gageToSaveInDatabase: Gage = {
    id: 0,
    title: gageToAddInDatabase.title,
    description: gageToAddInDatabase.description,
    is_done: false,
    cost: gageToAddInDatabase.cost,
    category: categoriesStore.categoryGageSelection,
    day: day,
    month: month,
    year: year,
    date_string: dateString,
  };

  const handlePress = () => {
    dispatch(setGageInDatabase(gageToSaveInDatabase));
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <View>
      <Title titleType="h1">Voici un résumé du gage 😈</Title>
      <Text>Test</Text>

      <Button onPress={() => navigation.goBack()}>Retour</Button>
    </View>
  );
};

export default GageValidateScreen;
