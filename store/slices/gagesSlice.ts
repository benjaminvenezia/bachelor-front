import { createSlice } from "@reduxjs/toolkit";

export type Gage = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  cost: number;
  category: string;
  day: number;
  month: number;
  year: number;
  date_string: string;
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
    addGage: (state, action) => {
      state.gages.push(action.payload);
    },
  },
});

export const { addGage } = gagesSlice.actions;
export default gagesSlice.reducer;
