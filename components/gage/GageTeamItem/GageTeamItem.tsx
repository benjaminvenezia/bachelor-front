import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { Gage } from "../../../types/Gage";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Button from "../../ui/Button/Button";

const GageTeamItem = ({ id, title, description, is_done, cost, category, day, month, year, user_name, user_id, user_points }: Gage) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View style={[styles.container, is_done ? styles.isDone : {}]}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      {/* <Text style={styles.text}>{description}</Text> */}
      <Text style={styles.text}>Attribué à {user_name}</Text>

      {user.id === user_id ? (
        <Button
          onPress={() => {
            alert(1);
          }}
        >
          Valider le gage
        </Button>
      ) : (
        ""
      )}

      <Text style={styles.text}>
        {day} - {month} - {year}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: "gray",
    padding: 10,
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
});

export default GageTeamItem;
