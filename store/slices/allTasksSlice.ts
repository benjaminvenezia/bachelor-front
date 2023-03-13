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

export type GenericsTasksState = {
  tasks: Task[];
};

const initialState: GenericsTasksState = {
  tasks: [
    {
      id: "",
      title: "Nettoyer le plan de travail",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 15,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "Faire la vaisselle à la main",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 30,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "remplir le lave vaisselle",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 10,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "Vider et nettoyer la table",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 15,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "Ranger les courses",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 10,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "faire le lit",
      category: CATEGORIES.ROOM,
      description: "description de la tâche",
      reward: 10,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
    {
      id: "",
      title: "Dépoussiérer les draps",
      category: CATEGORIES.ROOM,
      description: "description de la tâche",
      reward: 10,
      is_done: false,
      associated_day: "",
      path_icon_todo: "bocal",
    },
  ],
};

/**
 * return all tasks thematically associated.
 */
const activeTasksSlice = createSlice({
  name: "allTasks",
  initialState: initialState,
  reducers: {},
});

export const {} = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
