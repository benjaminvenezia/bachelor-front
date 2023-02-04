import { createSlice } from "@reduxjs/toolkit";
import { Task } from "./allTasksSlice";

export type ActiveTasksState = {
  tasks: Task[];
};

const initialState: ActiveTasksState = {
  tasks: [],
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
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, is_done: !task.is_done };
          } else {
            return task;
          }
        }),
      };
    },
    addTask: (state, action) => {
      const tasksFromCategory = action.payload;

      tasksFromCategory.forEach((taskObject: Task) => {
        state.tasks.push(taskObject);
      });
    },
    removeTask: (state, action) => {
      state.tasks.splice(state.tasks.indexOf(action.payload.id), 1);
    },
  },
});

export const { addTask, removeTask, toggleStatus } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
