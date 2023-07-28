import { View, Text, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { HabitListItemProps } from "./HabitListItemProps";
import Title from "../../ui/Title/Title";
import { useState } from "react";
import Toast from "react-native-toast-message";
import PointsLabel from "../../ui/PointsLabel/PointsLabel";

const HabitListItem = ({
  title,
  description,
  category,
  path_icon,
}: HabitListItemProps) => {
  const [level, setLevel] = useState(0);
  const MAX_LEVEL: number = 5;
  const PENALTIES_COST: number[] = [30, 100, 200, 350, 500];
  const COLORS_PROGRESSBAR: string[] = [
    "#1c0629",
    "#421462",
    "#700c50",
    "#cf2493",
    "#f67bbf",
  ];

  const createTwoButtonAlert = () => {
    if (level < MAX_LEVEL) {
      Alert.alert(
        "Confirmation",
        `Votre partenaire perdra ${PENALTIES_COST[level]} points.`,
        [
          {
            text: "Annuler",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => setLevel(level + 1) },
        ],
        {
          userInterfaceStyle: "dark",
        },
      );
    } else {
      LimitExceededToast();
    }
  };
  const LimitExceededToast = () => {
    Toast.show({
      type: "success",
      text1: `Niveau max atteint`,
      position: "bottom",
      bottomOffset: 120,
    });
  };

  return (
    <View onTouchEnd={createTwoButtonAlert} style={styles.container}>
      <Title titleType="h3" style={styles.text}>
        {title}
      </Title>
      <Text style={styles.text}>{description}</Text>

      <View style={styles.progressBarFull}>
        <View
          style={[
            {
              width: `${(100 / MAX_LEVEL) * level}%`,
              backgroundColor: `${COLORS_PROGRESSBAR[level - 1]}`,
            },
            styles.progressBar,
          ]}
        >
          <Text style={styles.text}> - {PENALTIES_COST[level - 1]}</Text>
          <PointsLabel />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#451c40",
    minHeight: 150,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    color: GlobalStyles.colors.text,
  },
  progressBar: {
    borderRadius: 100,
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  progressBarFull: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#3f1a3a",
    borderRadius: 100,
  },
});

export default HabitListItem;
