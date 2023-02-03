import { View, Text, StyleSheet } from "react-native";
import Day from "./Day";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DAYS from "../../constants/days";

const DaysContainer = () => {
  const day = useSelector((state: RootState) => state.day);

  return (
    <View style={styles.container}>
      <Text>The day active is : {day["activeDay"]}</Text>
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
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default DaysContainer;
