import { View, StyleSheet } from "react-native";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sortByDate } from "../../../store/slices/gagesSlice";
const GagesTeamsFilters = () => {
  const dispatch = useDispatch();

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
          dispatch(sortByDate());
        }}
      >
        Date
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
  filter: { marginRight: 10, marginBottom: 5 },
});

export default GagesTeamsFilters;
