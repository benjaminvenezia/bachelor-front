import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";

export type Task = {
  id: string;
  title: string;
  category: string;
  description: string;
  reward: number;
  is_done: boolean;
  associated_day: string;
  path_icon_todo: string;
};

// export type DefaultTask = {
//   id: string;
//   title: string;
//   category: string;
//   description: string;
//   reward: number;
//   path_icon_todo: string;
// };

export type GenericsTasksState = {
  tasks: Task[];
};

const initialState: GenericsTasksState = {
  tasks: [],
};

/**
 * return all tasks thematically associated.
 */
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
