import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";
import DAYS from "../../constants/days";
import { ImageBuilder } from "../../utils/ImageBuilder";

export type Task = {
  id: string;
  title: string;
  category: string;
  description: string;
  reward: number;
  isDone: boolean;
  associatedDay: string;
  pathIconTodo: string;
  // pathIconDone: string;
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
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "Faire la vaisselle à la main",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 30,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "remplir le lave vaisselle",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 10,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "Vider et nettoyer la table",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 15,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "Ranger les courses",
      category: CATEGORIES.KITCHEN,
      description: "description de la tâche",
      reward: 10,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "faire le lit",
      category: CATEGORIES.ROOM,
      description: "description de la tâche",
      reward: 10,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
    {
      id: "",
      title: "blblblbl",
      category: CATEGORIES.ROOM,
      description: "description de la tâche",
      reward: 10,
      isDone: false,
      associatedDay: "",
      pathIconTodo: ImageBuilder.GetImage("dishesToDo"),
    },
  ],
};

/**
 * return all tasks thematically associated.
 */
const activeTasksSlice = createSlice({
  name: "activeTasks",
  initialState: initialState,
  reducers: {},
});

export const {} = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
