import { View, StyleSheet } from "react-native";
import DayItem from "./DayItem";
import DAYS from "../../constants/days";

const DaysContainer = () => {
  return (
    <View style={styles.container}>
      <DayItem>{DAYS.MONDAY}</DayItem>
      <DayItem>{DAYS.TUESDAY}</DayItem>
      <DayItem>{DAYS.WEDNESDAY}</DayItem>
      <DayItem>{DAYS.THURSDAY}</DayItem>
      <DayItem>{DAYS.FRIDAY}</DayItem>
      <DayItem>{DAYS.SATURDAY}</DayItem>
      <DayItem>{DAYS.SUNDAY}</DayItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
  },
});

export default DaysContainer;
