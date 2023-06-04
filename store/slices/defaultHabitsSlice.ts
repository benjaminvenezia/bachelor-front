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

const defaultHabits = createSlice({
  name: "defaultHabits",
  initialState: initialState,
  reducers: {
    setDefaultHabits: (state, action): any => {
      const defaultHabitsFromDatabase = action.payload;

      state.defaultHabits = defaultHabitsFromDatabase;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDefaultHabitsFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.areDefaultHabitsFetched = false;
      })
      .addCase(fetchDefaultHabitsFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultHabitsFetched = true;
        state.defaultHabits = payload;
      })
      .addCase(fetchDefaultHabitsFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultHabitsFetched = false;
      });
  },
});

export const { setDefaultHabits } = defaultHabits.actions;
export default defaultHabits.reducer;
