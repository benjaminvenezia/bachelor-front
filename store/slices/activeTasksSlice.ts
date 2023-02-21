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
    setTasks: (state, action): any => {
      const tasksFromDatabase = action.payload;

      state.activeTasks = tasksFromDatabase;
    },
    removeTask: (state, action) => {
      return {
        ...state,
        activeTasks: state.activeTasks.filter((task) => task.id !== action.payload.id),
      };
    },
  },
});

export const { addTask, removeTask, toggleStatus, setTasks } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
