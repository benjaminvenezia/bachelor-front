import { View, Text } from "react-native";
import { CustomCalendar } from "../components";

const GageScreen = () => {
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
  return (
    <View>
      <Text>Gage</Text>

      <CustomCalendar
        markingType="multi-dot"
        markedDates={marked}
        onDayPress={(day) => console.log("onDayPress", day)}
        onDayLongPress={(day) => console.log("onDayLongPress", day)}
        onMonthChange={(date) => console.log("onMonthChange", date)}
        onPressArrowLeft={(goToPreviousMonth) => {
          console.log("onPressArrowLeft");
          goToPreviousMonth();
        }}
        onPressArrowRight={(goToNextMonth) => {
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
    </View>
  );
};
export default GageScreen;
