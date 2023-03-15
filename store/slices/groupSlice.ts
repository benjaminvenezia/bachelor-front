import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/Group";

type GroupState = {
  group: Group;
};

const initialState: GroupState = {
  group: {
    idGroup: "",
    GroupName: "",
    idUser1: 0,
    idUser2: 0,
    user1Name: "",
    user2Name: "",
    user1Points: 0,
    user2Points: 0,
    delta: 0,
    winner: "string",
    looser: "string",
  },
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
