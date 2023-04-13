import { View, StyleSheet, Text } from "react-native";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByDate,
  sortByDateDesc,
  sortByUser,
  resetGagesAssociatedToUsers,
  filterByGagesAreNotDone,
} from "../../../store/slices/gagesSlice";
import { useState } from "react";
import { RootState } from "../../../store/store";
const GagesTeamsFilters = () => {
  const dispatch = useDispatch();
  const [dateMode, setDateMode] = useState(true);

  const byDefault = {
    user1: false,
    user2: false,
    reset: false,
    hide: false,
  };

  const [data, setData] = useState({
    ...byDefault,
  });

  const { group } = useSelector((state: RootState) => state.group);

  return (
    <View style={styles.container}>
      <Button
        style={styles.filter}
        alternativeStyle={data.user1}
        onPress={() => {
          // onPress={(data) => setData((data) => ({
          //   ...data,
          //   data.user1 = true;
          // }))

          setData((data) => ({ ...byDefault, user1: !data.user1 }));
          dispatch(resetGagesAssociatedToUsers());
          dispatch(sortByUser({ userName: group?.user1Name }));
        }}
      >
        {group?.user1Name}
      </Button>
      <Button
        style={styles.filter}
        alternativeStyle={data.user2}
        onPress={() => {
          setData((data) => ({ ...byDefault, user2: !data.user2 }));
          dispatch(resetGagesAssociatedToUsers());
          dispatch(sortByUser({ userName: group?.user2Name }));
        }}
      >
        {group?.user2Name}
      </Button>
      <Button
        style={styles.filter}
        alternativeStyle={data.reset}
        onPress={() => {
          setData((data) => ({ ...byDefault, reset: !data.reset }));
          dispatch(resetGagesAssociatedToUsers());
        }}
      >
        Reinitialiser
      </Button>
      <Button
        style={styles.filter}
        onPress={() => {
          dispatch(resetGagesAssociatedToUsers());
          setDateMode(!dateMode);
          dateMode ? dispatch(sortByDate()) : dispatch(sortByDateDesc());
        }}
      >
        {dateMode ? "Asc" : "Desc"}
      </Button>
      <Button
        style={styles.filter}
        alternativeStyle={data.hide}
        onPress={() => {
          setData((data) => ({ ...byDefault, hide: !data.hide }));
          dispatch(resetGagesAssociatedToUsers());
          dispatch(filterByGagesAreNotDone());
        }}
      >
        Cacher
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row", flexWrap: "wrap" },
  filter: { marginRight: 10, marginBottom: 5 },
  text: { color: "white" },
});

export default GagesTeamsFilters;
