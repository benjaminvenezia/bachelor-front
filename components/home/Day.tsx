import { Pressable, Text, StyleSheet } from "react-native";
import { changeDay } from "../../store/slices/daySlice";
import { useDispatch } from "react-redux";

type DayProps = {
  children: any;
};

const Day = ({ children }: DayProps) => {
  const dispatch = useDispatch();

  return (
    <Pressable onPress={() => dispatch(changeDay({ activeDay: children }))}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default Day;
