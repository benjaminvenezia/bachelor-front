import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksListSlice from "./slices/tasksListSlice";
import userListSlice from "./slices/userListSlice";
import daySlice from "./slices/daySlice";

const rootReducer = combineReducers({
  userList: userListSlice,
  tasksList: tasksListSlice,
  day: daySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
