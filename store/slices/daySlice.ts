import { createSlice } from "@reduxjs/toolkit";
import { Day } from "../../types/Day";
import getCurrentLabelDay from "../../utils/getCurrentLabelDay";
import getCurrentLabelDayInFullText from "../../utils/getCurrentLabelDayInFullText";

const initialState: Day = {
  currentDay: getCurrentLabelDay(),
  activeDay: getCurrentLabelDay(),
  activeDayFullText: getCurrentLabelDayInFullText(getCurrentLabelDay()),
};

const daySlice = createSlice({
  name: "day",
  initialState: initialState,
  reducers: {
    changeDay: (state, action) => {
      return {
        activeDay: action.payload.activeDay,
        currentDay: state.currentDay,
        activeDayFullText: getCurrentLabelDayInFullText(action.payload.activeDay),
      };
    },
  },
});

export const { changeDay } = daySlice.actions;
export default daySlice.reducer;
