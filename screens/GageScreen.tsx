import { Text, StyleSheet, View } from "react-native";
import { Button, CustomCalendar, Title, Popup, DropdownGagesTasks } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownCategories } from "../components";
import { setGageInDatabase } from "../utils/http/httpGage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Gage } from "../store/slices/gagesSlice";

import { useEffect, useState } from "react";
import { GlobalStyles } from "../constants/style";
import DELAYS from "../constants/delays";
import { ScrollView } from "react-native-gesture-handler";

const GageScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const gagesStore = useSelector((state: RootState) => state.gages);

  const categoriesStore = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState<string>("title gage");
  const [description, setDescription] = useState<string>("description gage");
  const [is_done, setis_done] = useState<boolean>(false);
  const [cost, setCost] = useState<number>(450);
  const [categoryInStore, setCategoryInStore] = useState<null | string>(categoriesStore.categoryGageSelection);
  const [day, setDay] = useState<null | number>(null);
  const [month, setMonth] = useState<null | number>(null);
  const [year, setYear] = useState<null | number>(null);
  const [dateString, setDateString] = useState<string>("2023-03-12");

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

  const gageToSave: Gage = {
    id: -1,
    title: "title gage",
    description: "description gage",
    is_done: false,
    cost: 450,
    category: categoryInStore,
    day: day,
    month: month,
    year: year,
    date_string: "2023-03-12",
  };

  const handlePress = () => {
    setModalVisible(true);
    setGageInDatabase(gageToSave, user.user.token, dispatch);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setModalVisible(false);
    }, DELAYS.POPUP);

    return () => clearTimeout(timeoutId);
  }, [modalVisible]);

  const setTheCalendarGagePart = (data: any) => {
    setDateString(data.dateString);
    setDay(data.day);
    setMonth(data.month);
    setYear(data.year);
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
                color: "lightgreen",
              },
              dayTextAtIndex1: {
                color: "green",
              },
              dayTextAtIndex2: {
                color: "yellow",
              },
              dayTextAtIndex3: {
                color: "orange",
              },
              dayTextAtIndex4: {
                color: "red",
              },
              dayTextAtIndex5: {
                color: "purple",
              },
              dayTextAtIndex6: {
                color: "green",
              },
            },
            calendarBackground: "#111111",
            dayTextColor: "#fff",
            textDisabledColor: "#444",
            monthTextColor: "#888",
          }}
        />

        {day !== null && month !== null && year !== null && categoryInStore !== null ? (
          <Button onPress={handlePress}>Valider</Button>
        ) : (
          <Button size={GlobalStyles.buttons.xl} alternativeStyle={true} onPress={() => {}}>
            Choisir un jour
          </Button>
        )}

        {modalVisible && <Popup>Vous avez offert un gage!</Popup>}
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
