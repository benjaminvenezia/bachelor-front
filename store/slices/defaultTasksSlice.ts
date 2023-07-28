import { createSlice } from "@reduxjs/toolkit";
import { DefaultTask } from "../../types/DefaultTask";
import customFetch from "../../utils/http/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type DefaultTasksState = {
  defaultTasks: DefaultTask[];
  isLoading: boolean;
  areDefaultTasksFetched: boolean;
};

const initialState: DefaultTasksState = {
  defaultTasks: [],
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

const defaultTasks = createSlice({
  name: "defaultTasks",
  initialState: initialState,
  reducers: {
    setDefaultTasks: (state, action): any => {
      const defaultTasksFromDatabase = action.payload;

      state.defaultTasks = defaultTasksFromDatabase;
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
        state.defaultTasks = payload;
      })
      .addCase(fetchDefaultTasksFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultTasksFetched = false;
      });
  },
});

export const { setDefaultTasks } = defaultTasks.actions;
export default defaultTasks.reducer;
