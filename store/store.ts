import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./slices/tasksSlice";
import daySlice from "./slices/daySlice";
import defaultTasksSlice from "./slices/defaultTasksSlice";
import defaultHabitsSlice from "./slices/defaultHabitsSlice";
import daysToAddTasksSlice from "./slices/daysToAddTasksSlice";
import userSlice from "./slices/userSlice";
import groupSlice from "./slices/groupSlice";
import categoriesSlice from "./slices/categoriesSlice";
import gagesSlice from "./slices/gagesSlice";

const rootReducer = combineReducers({
  user: userSlice,
  tasks: tasksSlice,
  defaultTasks: defaultTasksSlice,
  defaultHabits: defaultHabitsSlice,
  day: daySlice,
  daysToAddTasks: daysToAddTasksSlice,
  group: groupSlice,
  categories: categoriesSlice,
  gages: gagesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
