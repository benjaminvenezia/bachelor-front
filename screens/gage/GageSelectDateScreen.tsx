import { View, Text, StyleSheet } from "react-native";
import { Button, CustomCalendar } from "../../components";
import ROUTES from "../../constants/routes";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";

const GageSelectDateScreen = ({ navigation }: any) => {
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

  const setTheCalendarGagePart = (data: any) => {
    setDay(data.day);
    setMonth(data.month);
    setYear(data.year);
    setDateString(data.dateString);
  };
  return (
    <View>
      <View>
        <Button onPress={() => navigation.navigate(ROUTES.VALIDATE_GAGE)}>validation</Button>
        <Button onPress={() => navigation.goBack()}>Retour</Button>

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
      </View>
    </View>
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
export default GageSelectDateScreen;
