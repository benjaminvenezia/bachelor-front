import { createSlice } from "@reduxjs/toolkit";
import DAYS from "../../constants/days";
import { Day } from "../../types/Day";

const initialState: Day = {
  activeDay: DAYS.MONDAY,
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
      };
    },
  },
});

export const { changeDay } = daySlice.actions;
export default daySlice.reducer;
