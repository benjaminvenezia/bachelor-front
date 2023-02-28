import { createSlice } from "@reduxjs/toolkit";
import CATEGORIES from "../../constants/categories";
import { ImageBuilder } from "../../utils/ImageBuilder";

export type Group = {
  id: string;
  name: string;
  userId1: number;
  userId2: number;
};

const initialState = {
  group: {},
};

/**
 * return all tasks thematically associated.
 */
const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload.group;
    },
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
