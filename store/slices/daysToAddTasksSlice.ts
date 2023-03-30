import { createSlice } from "@reduxjs/toolkit";

export type daysToAddTasksState = {
  activeDays: Array<string>;
};

const initialState: daysToAddTasksState = {
  activeDays: [],
};

/**
 * Manage the days currently selected in CategoryScreen
 */
const daysToAddTasksSlice = createSlice({
  name: "activeDays",
  initialState: initialState,
  reducers: {
    addDay: (state, action) => {
      state.activeDays.push(action.payload.label);
    },
    removeDay: (state, action) => {
      state.activeDays.splice(state.activeDays.indexOf(action.payload.label), 1);
    },
    resetDays: (state) => {
      state.activeDays = [];
    },
  },
});

export const { addDay, removeDay, resetDays } = daysToAddTasksSlice.actions;
export default daysToAddTasksSlice.reducer;
