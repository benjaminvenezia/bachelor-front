import { createSlice } from "@reduxjs/toolkit";
import { Day } from "../../types/Day";
import getCurrentLabelDay from "../../utils/getCurrentLabelDay";

const initialState: Day = {
  currentDay: getCurrentLabelDay(),
  activeDay: getCurrentLabelDay(),
};

/**
 * This slice store the ACTIVE DAY selected by user in Home.
 */
const daySlice = createSlice({
  name: "day",
  initialState: initialState,
  reducers: {
    changeDay: (state, action) => {
      return {
        activeDay: action.payload.activeDay,
        currentDay: state.currentDay,
      };
    },
  },
});

export const { changeDay } = daySlice.actions;
export default daySlice.reducer;
