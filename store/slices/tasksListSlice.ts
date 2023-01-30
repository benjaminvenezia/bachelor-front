import { createSlice } from "@reduxjs/toolkit";

export type Task = {
  id: string;
};

export type TaskListState = {
  tasks: Task[];
};

const initialState: TaskListState = {
  tasks: [],
};

const tasksListSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      //we can mutate our state
      state.tasks.push(action.payload.id);
    },
    removeTask: (state, action) => {
      state.tasks.splice(state.tasks.indexOf(action.payload.id), 1);
    },
  },
});

export const addTask = tasksListSlice.actions.addTask;
export const removeTask = tasksListSlice.actions.removeTask;
export default tasksListSlice.reducer;
