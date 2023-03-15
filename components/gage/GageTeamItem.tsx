import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { Gage } from "../../store/slices/gagesSlice";

const GageTeamItem = ({ id, title, description, is_done, cost, category, day, month, year, user_name, user_points }: Gage) => {
  return (
    <Pressable style={styles.container}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{user_name}</Text>
      <Text style={styles.text}>
        {day} - {month} - {year}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderLeftWidth: 5,
    borderColor: "white",
    paddingLeft: 10,
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
