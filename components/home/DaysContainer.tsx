import { View, Text, StyleSheet } from "react-native";
import Day from "./Day";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DaysContainer = () => {
  const day = useSelector((state: RootState) => state.day);

  return (
    <View style={styles.container}>
      <Text>The day active is : {day["activeDay"]}</Text>
      <Day>Lun</Day>
      <Day>Mar</Day>
      <Day>Mer</Day>
      <Day>Jeu</Day>
      <Day>Ven</Day>
      <Day>Sam</Day>
      <Day>Dim</Day>
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
