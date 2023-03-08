import { createSlice } from "@reduxjs/toolkit";

export type Gage = {
  title: string;
  description: string;
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
    changeGageStatus: (state, action) => {},
  },
});

export const { changeGageStatus } = gagesSlice.actions;
export default gagesSlice.reducer;
