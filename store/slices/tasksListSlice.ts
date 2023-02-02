import { createSlice } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  reward: number;
  is_done: boolean;
};

export type TaskListState = {
  tasks: Task[];
};

const initialState: TaskListState = {
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

const tasksListSlice = createSlice({
  name: "tasks",
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
