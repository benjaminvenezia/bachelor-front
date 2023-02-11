import { createSlice } from "@reduxjs/toolkit";
import { Task } from "./allTasksSlice";

export type ActiveTasksState = {
  activeTasks: Task[];
};

const initialState: ActiveTasksState = {
  activeTasks: [],
};

/**
 * return active tasks (selected in thematic menu) attached in a specific day.
 */
const activeTasksSlice = createSlice({
  name: "activeTasks",
  initialState: initialState,
  reducers: {
    toggleStatus: (state, action) => {
      return {
        ...state,
        activeTasks: state.activeTasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, isDone: !task.isDone };
          } else {
            return task;
          }
        }),
      };
    },
    addTask: (state, action): any => {
      const tasksFromCategory = action.payload;

      tasksFromCategory.forEach((taskObject: Task) => {
        state.activeTasks.push(taskObject);
      });
    },
    removeTask: (state, action) => {
      state.activeTasks.splice(state.activeTasks.indexOf(action.payload.id), 1);
    },
  },
});

export const { addTask, removeTask, toggleStatus } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
