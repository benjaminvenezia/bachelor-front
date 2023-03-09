import { createSlice } from "@reduxjs/toolkit";

export type Gage = {
  title: string;
  description: string;
  category: string;
  isDone: boolean;
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export type Gages = {
  gages: Gage[];
};

const initialState: Gages = {
  gages: [],
};

const gagesSlice = createSlice({
  name: "gages",
  initialState: initialState,
  reducers: {
    changeGageStatus: (state, action) => {
      state.gages.push(action.payload.newGages);
    },
  },
});

export const { changeGageStatus } = gagesSlice.actions;
export default gagesSlice.reducer;
