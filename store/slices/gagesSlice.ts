import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gage } from "../../types/Gage";
import { GageTask } from "../../types/GageTask";
import { Task } from "react-native";
import customFetch from "../../utils/http/axios";

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */

type GagesState = {
  gages: Gage[];
  gagesTask: GageTask[];
  gagesTaskFiltered: any;
  gageToAddInDatabase: any;
  isLoading: boolean;
};

const initialState: GagesState = {
  gages: [],
  gagesTask: [],
  gagesTaskFiltered: [],
  gageToAddInDatabase: {},
  isLoading: false,
};

export const fetchDefaultGagesFromDatabase = createAsyncThunk("defaultGages/fetchDefaultGagesFromDatabase", async (thunkAPI) => {
  try {
    const resp = await customFetch.get(`/default_gages`);
    return resp.data;
  } catch (error: any) {
    console.log("erreur dans le thunk: ", error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const gagesSlice = createSlice({
  name: "gages",
  initialState: initialState,
  reducers: {
    setGages: (state, action) => {
      state.gages = action.payload;
    },
    setGagesTask: (state, action) => {
      state.gagesTask = action.payload;
    },
    addGage: (state, action) => {
      state.gages.push(action.payload);
    },
    /** Used in GageScreen to dynamically update the gageTask when user select a category. */
    filterGageTask: (state, action) => {
      state.gagesTaskFiltered = state.gagesTask.filter((item) => item.category === action.payload.category);
    },
    setTheGageBeforeSendingDatabase: (state, action) => {
      state.gageToAddInDatabase = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDefaultGagesFromDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDefaultGagesFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.gagesTask = payload;
      })
      .addCase(fetchDefaultGagesFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { setGages, setGagesTask, addGage, filterGageTask, setTheGageBeforeSendingDatabase } = gagesSlice.actions;
export default gagesSlice.reducer;
