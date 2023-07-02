import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { PointsLabel, DeltaPointsLabel } from "../../index";

const UserPoints = () => {
  return (
    <View>
      <Text style={styles.text}>
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
