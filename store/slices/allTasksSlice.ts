import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import customFetch from "../../utils/http/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  areDefaultTasksFetched: boolean;
};

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  areDefaultTasksFetched: false,
};

export const fetchDefaultTasksFromDatabase: any = createAsyncThunk("allTasks/fetchDefaultTasksFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/default_tasks`);

    return resp.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const allTasksSlice = createSlice({
  name: "allTasks",
  initialState: initialState,
  reducers: {
    setDefaultTasks: (state, action): any => {
      const defaultTasksFromDatabase = action.payload;

      state.tasks = defaultTasksFromDatabase;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDefaultTasksFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.areDefaultTasksFetched = false;
      })
      .addCase(fetchDefaultTasksFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultTasksFetched = true;
        state.tasks = payload;
      })
      .addCase(fetchDefaultTasksFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultTasksFetched = false;
      });
  },
});

export const { setDefaultTasks } = allTasksSlice.actions;
export default allTasksSlice.reducer;
