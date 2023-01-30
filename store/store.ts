import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksListSlice from "./slices/tasksListSlice";
import userListSlice from "./slices/userListSlice";

const rootReducer = combineReducers({
  userList: userListSlice,
  tasksList: tasksListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
