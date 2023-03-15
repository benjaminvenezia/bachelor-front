import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";

/**
 * Gage is the ultimate object who is stored in database.
 */
export type Gage = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  cost: number;
  category: string | null;
  day: number | null;
  month: number | null;
  year: number | null;
  date_string: string;
  user_id?: string;
  user_name?: string;
  user_points?: number;
};

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */
export type GageTask = {
  id: number;
  title: string;
  description: string;
  cost: number;
  category: string;
};

export type Gages = {
  gages: Gage[];
  gagesTask: GageTask[];
  gagesTaskFiltered: any;
  gageToAddInDatabase: any;
};

const initialState: Gages = {
  gages: [],
  gagesTask: [],
  gagesTaskFiltered: [],
  gageToAddInDatabase: {},
};

// const initialStateOfGagesTaskFiltered = () => {
//   const category = CATEGORIES.KITCHEN;
//   const filteredGagesTask = initialState.gagesTask.filter((gageTask) => gageTask.category === category);
//   initialState.gagesTaskFiltered = filteredGagesTask;
// };
// initialStateOfGagesTaskFiltered();

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
