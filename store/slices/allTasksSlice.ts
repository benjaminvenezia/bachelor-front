import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const allTasksSlice = createSlice({
  name: "allTasks",
  initialState: initialState,
  reducers: {
    setDefaultTasks: (state, action): any => {
      const defaultTasksFromDatabase = action.payload;

      state.tasks = defaultTasksFromDatabase;
    },
  },
});

export const { setDefaultTasks } = allTasksSlice.actions;
export default allTasksSlice.reducer;
