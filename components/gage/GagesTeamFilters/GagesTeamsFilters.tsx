import { View, StyleSheet } from "react-native";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sortByDate, sortByDateDesc } from "../../../store/slices/gagesSlice";
import { useState } from "react";
const GagesTeamsFilters = () => {
  const dispatch = useDispatch();
  const [dateMode, setDateMode] = useState(true);

  return (
    <View style={styles.container}>
      <Button style={styles.filter} onPress={() => {}}>
        User 1
      </Button>
      <Button style={styles.filter} onPress={() => {}}>
        User 2
      </Button>
      <Button
        style={styles.filter}
        onPress={() => {
          setDateMode(!dateMode);
          dateMode ? dispatch(sortByDate()) : dispatch(sortByDateDesc());
        }}
      >
        {dateMode ? "Asc" : "Desc"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
  filter: { marginRight: 10, marginBottom: 5 },
});

export default GagesTeamsFilters;
