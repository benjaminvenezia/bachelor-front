import { Pressable, Text, StyleSheet } from "react-native";
import { changeDay } from "../../../store/slices/daySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { GlobalStyles } from "../../../constants/style";
import { DayItemProps } from "./DayItemProps.types";

const DayItem = ({ children }: DayItemProps) => {
  const dispatch = useDispatch();

  const { activeDay } = useSelector((state: RootState) => state.day);

  return (
    <Pressable onPress={() => dispatch(changeDay({ activeDay: children }))}>
      <Text style={activeDay === children ? [styles.text, styles.active] : styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: GlobalStyles.fontsSize.dayText,
    color: GlobalStyles.colors.text,
  },
  active: {
    fontWeight: "bold",
  },
});

export default DayItem;