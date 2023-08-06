import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { Gage } from "../../../types/Gage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import Button from "../../ui/Button/Button";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import {
  validateGage,
  validateGageInDatabase,
} from "../../../store/slices/gagesSlice";
import ToastPopUp from "../../../utils/ToastPopUp";

const GageTeamListItem = ({
  id,
  title,
  description,
  is_done,
  cost,
  category,
  day,
  month,
  year,
  user_name,
  user_id,
  user_points,
}: Gage) => {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  return (
    <View style={[styles.container, is_done ? styles.isDone : {}]}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <View style={styles.infoContainer}>
        <FontAwesome5
          style={styles.icon}
          name="skull"
          size={19}
          color="white"
        />
        <Text style={styles.text}>{user_name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Fontisto style={styles.icon} name="date" size={24} color="white" />
        <Text style={styles.text}>
          {day}/{month}/{year}
        </Text>
      </View>
      {user?.id === user_id ? (
        <Button
          onPress={() => {
            dispatch(validateGage({ gageId: id }));
            dispatch(validateGageInDatabase({ gageId: id }));
            ToastPopUp("Le gage a été validé.");
          }}
        >
          Valider le gage
        </Button>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.secondary,
    minHeight: 150,
    borderRadius: 25,
    marginBottom: 5,
    padding: 15,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 7,
  },
  isDone: {
    backgroundColor: GlobalStyles.colors.done,
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
  icon: {
    marginEnd: 10,
  },
});

export default GageTeamListItem;
