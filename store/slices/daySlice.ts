import { createSlice } from "@reduxjs/toolkit";

export type Day = {
  activeDay: string;
};

const initialState: Day = {
  activeDay: "lun",
};

const daySlice = createSlice({
  name: "day",
  initialState: initialState,
  reducers: {
    changeDay: (state, action) => {
      return {
        ...state,
        day: action.payload.day,
      };
    },
  },
});

export const { changeDay } = daySlice.actions;
export default daySlice.reducer;
