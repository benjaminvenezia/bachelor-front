import { combineReducers, configureStore } from "@reduxjs/toolkit";
import activeTasksSlice from "./slices/activeTasksSlice";
import daySlice from "./slices/daySlice";
import allTasksSlice from "./slices/allTasksSlice";
import daysToAddTasksSlice from "./slices/daysToAddTasksSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  activeTasksList: activeTasksSlice,
  allTasksList: allTasksSlice,
  day: daySlice,
  daysToAddTasks: daysToAddTasksSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
