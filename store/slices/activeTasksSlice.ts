import { createSlice } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  reward: number;
  is_done: boolean;
  // associated_day: string;
};

export type ActiveTasksState = {
  tasks: Task[];
};

const initialState: ActiveTasksState = {
  tasks: [
    {
      id: "1",
      title: "Nettoyer la cuisine",
      reward: 15,
      is_done: false,
    },
    {
      id: "2",
      title: "Faire la vaisselle",
      reward: 20,
      is_done: false,
    },
    {
      id: "3",
      title: "Vider et nettoyer la table",
      reward: 15,
      is_done: false,
    },
    {
      id: "4",
      title: "Ranger les courses",
      reward: 15,
      is_done: false,
    },
  ],
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

    removeTask: (state, action) => {
      state.tasks.splice(state.tasks.indexOf(action.payload.id), 1);
    },
  },
});

export const { removeTask, toggleStatus } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
