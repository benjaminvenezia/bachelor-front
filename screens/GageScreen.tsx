import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const GageScreen = () => {
  return (
    <View>
      <Text>Gage</Text>
      <Calendar
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
      />
    </View>
  );
};
export default GageScreen;
