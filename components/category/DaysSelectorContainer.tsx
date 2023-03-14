import { View, StyleSheet } from "react-native";
import DaySelector from "./DaySelector";
import DAYS from "../../constants/days";
import Title from "../ui/Title";

const daysLabels: Array<string> = [DAYS.MONDAY, DAYS.THURSDAY, DAYS.WEDNESDAY, DAYS.TUESDAY, DAYS.FRIDAY, DAYS.SATURDAY, DAYS.SUNDAY];

const DaysSelectorContainer = () => {
  return (
    <View>
      <Title titleType="h3">À quel(s) jour(s) souhaitez vous attribuer ces tâches?</Title>
      <View style={styles.container}>
        {daysLabels.map((day, index) => (
          <DaySelector key={index} label={day} />
        ))}
      </View>
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
