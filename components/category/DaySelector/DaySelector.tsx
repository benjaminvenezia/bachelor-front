import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDay, removeDay } from "../../../store/slices/daysToAddTasksSlice";
import { RootState } from "../../../store/store";
import { GlobalStyles } from "../../../constants/style";
import { DaySelectorProps } from "./DaySelectorProps.types";

const DaySelector = ({ label }: DaySelectorProps) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const { activeDays } = useSelector((state: RootState) => state.daysToAddTasks);

  const addTaskDay = () => {
    setIsSelected(!isSelected);

    if (isSelected) {
      dispatch(removeDay({ label: label }));
    }

    if (!activeDays.includes(label)) {
      dispatch(addDay({ label: label }));
    }
  };

  return (
    <Pressable onPress={() => addTaskDay()} style={[styles.container, isSelected ? styles.isSelectedItem : null]}>
      <View>
        <Text style={[isSelected ? styles.isSelectedText : styles.text]}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderWidth: 5,
    borderColor: "white",
    marginVertical: 5,
    marginHorizontal: 3,
    borderRadius: 100,
  },
  isSelectedItem: {
    backgroundColor: GlobalStyles.colors.primary,
  },
  isSelectedText: {
    color: "black",
    fontSize: GlobalStyles.fontsSize.text,
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});

export default DaySelector;
