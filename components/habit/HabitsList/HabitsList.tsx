import { View, Text } from "react-native";
import Habit from "../HabitListItem/HabitListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchDefaultHabitsFromDatabase } from "../../../store/slices/defaultHabitsSlice";
import { useEffect } from "react";

const HabitsList = () => {
  const { defaultHabits } = useSelector(
    (state: RootState) => state.defaultHabits,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDefaultHabitsFromDatabase());
  }, []);

  return (
    <View>
      {defaultHabits.map((habit) => (
        <Habit key={habit.id} {...habit} />
      ))}
    </View>
  );
};
export default HabitsList;
