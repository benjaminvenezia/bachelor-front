import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import PointsLabel from "../../ui/PointsLabel/PointsLabel";
import DeltaPointsLabel from "../../ui/DeltaPointsLabel/DeltaPointsLabel";

const UserPoints = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View>
      <Text style={styles.text}>
        {user?.name === group?.winner ? "+" : "-"}
        <DeltaPointsLabel />
        <PointsLabel />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "900",
    fontSize: 20,
  },
});

export default UserPoints;
