import { createSlice } from "@reduxjs/toolkit";
import { Gage } from "../../types/Gage";
import { GageTask } from "../../types/GageTask";

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */

type GagesState = {
  gages: Gage[];
  gagesTask: GageTask[];
  gagesTaskFiltered: any;
  gageToAddInDatabase: any;
};

const initialState: GagesState = {
  gages: [],
  gagesTask: [],
  gagesTaskFiltered: [],
  gageToAddInDatabase: {},
};

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
});

export const { setGages, setGagesTask, addGage, filterGageTask, setTheGageBeforeSendingDatabase } = gagesSlice.actions;
export default gagesSlice.reducer;
