import { Pressable, View, Text } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import Title from "../../ui/Title/Title";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constants/routes";

const CurrentWinnerBadge = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const [winnerLabel, setWinnerLabel] = useState(group?.winner);

  const navigation = useNavigation();

  useEffect(() => {
    setWinnerLabel(group?.winner);
  }, [group]);

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTES.TEAM_TAB)}>
      <View style={styles.box}>
        <MaterialCommunityIcons style={styles.icon} name="crown-outline" size={20} color="black" />
        <Title titleType="h5" style={styles.text}>
          {winnerLabel?.slice(0, 3)}
        </Title>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    backgroundColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    width: 55,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  box: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    color: "white",
    margin: 0,
    padding: 0,
  },
});

export default CurrentWinnerBadge;
