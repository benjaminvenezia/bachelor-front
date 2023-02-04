import { combineReducers, configureStore } from "@reduxjs/toolkit";
import activeTasksSlice from "./slices/activeTasksSlice";
import userListSlice from "./slices/userListSlice";
import daySlice from "./slices/daySlice";
import allTasksSlice from "./slices/allTasksSlice";

const rootReducer = combineReducers({
  userList: userListSlice,
  activeTasksList: activeTasksSlice,
  allTasksList: allTasksSlice,
  day: daySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
