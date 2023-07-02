import { View, Text } from "react-native";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const DeltaPointsLabel = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.user);

  const [delta, setDelta] = useState(0);

  useEffect(() => {
    if (user?.name === group?.user1Name) {
      setDelta(user?.points - group?.user2Points);
    } else {
      setDelta(user?.points - group?.user1Points);
    }
  }, [user?.points]);

  return <Text style={styles.text}>{delta}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "900",
    fontSize: 20,
  },
});

export default DeltaPointsLabel;
