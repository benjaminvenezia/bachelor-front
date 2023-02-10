import { View, StyleSheet } from "react-native";
import { DaySelector } from "../";
import DAYS from "../../constants/days";

const daysLabels: Array<string> = [DAYS.MONDAY, DAYS.THURSDAY, DAYS.WEDNESDAY, DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SATURDAY, DAYS.SUNDAY];

const DaysSelectorContainer = () => {
  return (
    <View style={styles.container}>
      {daysLabels.map((day, index) => (
        <DaySelector key={index} label={day} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
  },
});

export default DaysSelectorContainer;
