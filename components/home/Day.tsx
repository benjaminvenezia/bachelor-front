import { Pressable, Text, StyleSheet } from "react-native";
import { changeDay } from "../../store/slices/daySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

type DayProps = {
  children: any;
};

const Day = ({ children }: DayProps) => {
  const dispatch = useDispatch();

  const storeActiveDay = useSelector((state: RootState) => state.day);

  return (
    <Pressable onPress={() => dispatch(changeDay({ activeDay: children }))}>
      <Text style={storeActiveDay["activeDay"] === children ? [styles.text, styles.active] : styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  active: {
    fontWeight: "bold",
  },
});

export default Day;
