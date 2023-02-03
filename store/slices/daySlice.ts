import { createSlice } from "@reduxjs/toolkit";

export type Day = {
  activeDay: string;
};

const initialState: Day = {
  activeDay: "",
};

/**
 * This slice store the ACTIVE DAY selected by user.
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
