import { View, Text, StyleSheet } from "react-native";
import Day from "./Day";
import DAYS from "../../constants/days";

const DaysContainer = () => {
  return (
    <View style={styles.container}>
      <Day>{DAYS.MONDAY}</Day>
      <Day>{DAYS.TUESDAY}</Day>
      <Day>{DAYS.WEDNESDAY}</Day>
      <Day>{DAYS.THURSDAY}</Day>
      <Day>{DAYS.FRIDAY}</Day>
      <Day>{DAYS.SATURDAY}</Day>
      <Day>{DAYS.SUNDAY}</Day>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default DaysContainer;
