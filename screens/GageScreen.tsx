import { Text, StyleSheet } from "react-native";
import { Button, CustomCalendar, Title, DropdownGagesTasks } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownCategories } from "../components";
import { setGageInDatabase } from "../store/slices/gagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Gage } from "../types/Gage";

import { useEffect, useState } from "react";
import { GlobalStyles } from "../constants/style";
import { ScrollView } from "react-native-gesture-handler";
import { fetchDefaultGagesFromDatabase } from "../store/slices/gagesSlice";

const GageScreen = () => {
  const gagesStore = useSelector((state: RootState) => state.gages);
  const categoriesStore = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch();

  const [day, setDay] = useState<null | number>(null);
  const [month, setMonth] = useState<null | number>(null);
  const [year, setYear] = useState<null | number>(null);
  const [dateString, setDateString] = useState("");

  const running = { key: "running", color: "blue" };
  const cycling = { key: "cycling", color: "green" };
  const walking = { key: "walking", color: "orange" };
  const marked = {
    "2023-03-01": {
      dots: [running, walking],
    },
    "2023-03-02": {
      dots: [running, walking, cycling],
    },
  };

  const gageToSaveInDatabase: Gage = {
    id: 0,
    title: gagesStore.gageToAddInDatabase.title,
    description: gagesStore.gageToAddInDatabase.description,
    is_done: false,
    cost: gagesStore.gageToAddInDatabase.cost,
    category: categoriesStore.categoryGageSelection,
    day: day,
    month: month,
    year: year,
    date_string: dateString,
  };

  useEffect(() => {
    dispatch(fetchDefaultGagesFromDatabase());
  }, []);

  const setTheCalendarGagePart = (data: any) => {
    setDay(data.day);
    setMonth(data.month);
    setYear(data.year);
    setDateString(data.dateString);
  };

  const handlePress = () => {
    dispatch(setGageInDatabase(gageToSaveInDatabase));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <Title titleType="h1">Faire subir un gage</Title>

        <Text style={styles.text}>Choississeez une catégorie!</Text>
        <DropdownCategories />

        <Text style={styles.text}>Choississeez une tâche!</Text>
        <DropdownGagesTasks />

        <Text style={styles.text}>Choississez une date :</Text>
        <CustomCalendar
          markingType="multi-dot"
          markedDates={marked}
          onDayPress={(day: string) => setTheCalendarGagePart(day)}
          onDayLongPress={(day: string) => console.log("onDayLongPress", day)}
          onMonthChange={(date: string) => console.log("onMonthChange", date)}
          onPressArrowLeft={(goToPreviousMonth: any) => {
            console.log("onPressArrowLeft");
            goToPreviousMonth();
          }}
          onPressArrowRight={(goToNextMonth: any) => {
            console.log("onPressArrowRight");
            goToNextMonth();
          }}
          style={{
            borderRadius: 5,
            marginVertical: 10,
            elevation: 5,
            borderWidth: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "white",
              },
              dayTextAtIndex1: {
                color: "white",
              },
              dayTextAtIndex2: {
                color: "white",
              },
              dayTextAtIndex3: {
                color: "white",
              },
              dayTextAtIndex4: {
                color: "white",
              },
              dayTextAtIndex5: {
                color: "white",
              },
              dayTextAtIndex6: {
                color: "white",
              },
            },
            calendarBackground: "#111111",
            dayTextColor: "#fff",
            textDisabledColor: "#444",
            monthTextColor: "#888",
          }}
        />
        {day !== null && month !== null && year !== null ? (
          <Button onPress={handlePress}>Valider</Button>
        ) : (
          <Button size={GlobalStyles.buttons.xl} alternativeStyle={true} onPress={() => {}}>
            Choisir un jour
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
});

export default GageScreen;
