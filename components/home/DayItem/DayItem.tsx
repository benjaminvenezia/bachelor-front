import { Pressable, Text, StyleSheet, View } from "react-native";
import { changeDay } from "../../../store/slices/daySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { GlobalStyles } from "../../../constants/style";
import { DayItemProps } from "./DayItemProps.types";

const DayItem = ({ children }: DayItemProps) => {
  const dispatch = useDispatch();

  const { activeDay, currentDay } = useSelector((state: RootState) => state.day);

  return (
    <Pressable onPress={() => dispatch(changeDay({ activeDay: children }))}>
      <View style={styles.containerCurrentDay}>
        <Text style={children === activeDay ? [styles.text, styles.active] : styles.text}>{children}</Text>

        {children === currentDay ? <Text style={[styles.text, styles.dot]}>•</Text> : ""}
      </View>
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
  current: {
    color: "blue",
  },
  dot: {
    fontSize: 30,
    marginTop: -10,
  },
  containerCurrentDay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default DayItem;
