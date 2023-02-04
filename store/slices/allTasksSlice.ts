import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";

export type Task = {
  id: string;
  title: string;
  category: string;
  reward: number;
  is_done: boolean;
};

export type GenericsTasksState = {
  tasks: Task[];
};

const initialState: GenericsTasksState = {
  tasks: [
    {
      id: "1",
      title: "Nettoyer le plan de travail",
      category: CATEGORIES.KITCHEN,
      reward: 15,
      is_done: false,
    },
    {
      id: "2",
      title: "Faire la vaisselle à la main",
      category: CATEGORIES.KITCHEN,
      reward: 30,
      is_done: false,
    },
    {
      id: "3",
      title: "remplir le lave vaisselle",
      category: CATEGORIES.KITCHEN,
      reward: 10,
      is_done: false,
    },
    {
      id: "4",
      title: "Vider et nettoyer la table",
      category: CATEGORIES.KITCHEN,
      reward: 15,
      is_done: false,
    },
    {
      id: "5",
      title: "Ranger les courses",
      category: CATEGORIES.KITCHEN,
      reward: 10,
      is_done: false,
    },
    {
      id: "6",
      title: "faire le lit",
      category: CATEGORIES.ROOM,
      reward: 10,
      is_done: false,
    },
  ],
};

/**
 * return all tasks thematically associated.
 */
const activeTasksSlice = createSlice({
  name: "activeTasks",
  initialState: initialState,
  reducers: {
    removeTask: (state, action) => {
      state.tasks.splice(state.tasks.indexOf(action.payload.id), 1);
    },
  },
});

export const { removeTask } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;