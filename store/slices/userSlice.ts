import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type UserState = {
  token: string;
  user: User;
};

const initialState: UserState | any = {
  user: {},
};
/**
 * This slice store the crucial information for the user.
 */
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        user: action.payload.user,
      };
    },
    setOtherCode: (state, action) => {
      return {
        ...state,
        other_code: action.payload.other_code,
      };
    },
    setUserPoints: (state, action) => {
      state.user.user.points += action.payload.points;
    },
  },
});

export const { setUser, setOtherCode, setUserPoints } = userSlice.actions;
export default userSlice.reducer;
