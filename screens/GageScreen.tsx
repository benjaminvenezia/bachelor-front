import { Text } from "react-native";
import { Button, CustomCalendar, Title } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownCategories } from "../components";
import { setGageInDatabase } from "../utils/http/httpGage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Gage } from "../store/slices/gagesSlice";
import { useState } from "react";
import { GlobalStyles } from "../constants/style";

const GageScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const gages = useSelector((state: RootState) => state.gages);
  const categories = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch();

  const [id, setId] = useState<number>(-1);
  const [title, setTitle] = useState<string>("title gage");
  const [description, setDescription] = useState<string>("description gage");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [cost, setCost] = useState<number>(450);
  const [category, setCategory] = useState<null | string>(null);
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

  console.log("In gagescreen : ", gages);

  const handlePress = () => {
    setGageInDatabase(gageTest, user.user.token, dispatch);
  };

  const setupTheGage = (data: any) => {
    setDateString(data.dateString);
    setDay(data.day);
    setMonth(data.month);
    setYear(data.year);
    setCategory(categories.categoryGageSelection);
  };

  const gageTest: Gage = {
    id: -1,
    title: "title gage",
    description: "description gage",
    is_done: false,
    cost: 450,
    category: category,
    day: day,
    month: month,
    year: year,
    date_string: "2023-03-12",
  };

  return (
    <SafeAreaView>
      <Title>Faire subir un gage</Title>

      <Text>Choississeez une catégorie!</Text>
      <DropdownCategories />

      <Text>Faire subir un gage</Text>

      <CustomCalendar
        markingType="multi-dot"
        markedDates={marked}
        onDayPress={(day: string) => setupTheGage(day)}
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
          margin: 12,
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
      {day !== null && month !== null && year !== null ? (
        <Button onPress={handlePress}>Valider</Button>
      ) : (
        <Button size={GlobalStyles.buttons.xl} alternativeStyle={true} onPress={() => {}}>
          Choisir un jour
        </Button>
      )}
    </SafeAreaView>
  );
};
export default GageScreen;
