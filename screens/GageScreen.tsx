import { Text } from "react-native";
import { Button, CustomCalendar, Title } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownCategories } from "../components";
import { setGageInDatabase } from "../utils/http/httpGage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Gage } from "../store/slices/gagesSlice";

const GageScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const gages = useSelector((state: RootState) => state.gages);
  const dispatch = useDispatch();

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

  const gageTest: Gage = {
    id: -1,
    title: "title gage",
    description: "description gage",
    is_done: false,
    cost: 450,
    category: "category gage",
    day: 12,
    month: 3,
    year: 2023,
    date_string: "2023-03-12",
  };

  const handlePress = () => {
    setGageInDatabase(gageTest, user.user.token, dispatch);
  };

  return (
    <SafeAreaView>
      <Title>Faire subir un gage</Title>
      <DropdownCategories />

      <Text>Faire subir un gage</Text>

      <CustomCalendar
        markingType="multi-dot"
        markedDates={marked}
        onDayPress={(day: string) => console.log("onDayPress", day)}
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

      <Button onPress={handlePress}>Valider</Button>
    </SafeAreaView>
  );
};
export default GageScreen;
