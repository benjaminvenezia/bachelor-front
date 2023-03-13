import { createSlice } from "@reduxjs/toolkit";

export type Group = {
  idGroup: string;
  GroupName: string;
  idUser1: number;
  idUser2: number;
  user1Name: string;
  user2Name: string;
  user1Points: number;
  user2Points: number;
  delta: number;
  winner: string;
  looser: string;
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
      state.group = action.payload;
    },
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
