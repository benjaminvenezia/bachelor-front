import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksListSlice from "./slices/activeTasksSlice";
import userListSlice from "./slices/userListSlice";
import daySlice from "./slices/daySlice";
import allTasksSlice from "./slices/allTasksSlice";

const rootReducer = combineReducers({
  userList: userListSlice,
  tasksList: tasksListSlice,
  allTasksList: allTasksSlice,
  day: daySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
