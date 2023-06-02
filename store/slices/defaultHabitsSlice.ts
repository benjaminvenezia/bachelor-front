import { createSlice } from "@reduxjs/toolkit";
import { DefaultHabit } from "../../types/DefaultHabit";
import customFetch from "../../utils/http/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type DefaultHabitsState = {
  defaultHabits: DefaultHabit[];
  isLoading: boolean;
  areDefaultHabitsFetched: boolean;
};

const initialState: DefaultHabitsState = {
  defaultHabits: [],
  isLoading: false,
  areDefaultHabitsFetched: false,
};

export const fetchDefaultHabitsFromDatabase: any = createAsyncThunk("defaultHabits/fetchDefaultHabitsFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/default_habits`);

    return resp.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const defaultTasks = createSlice({
  name: "defaultHabits",
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
