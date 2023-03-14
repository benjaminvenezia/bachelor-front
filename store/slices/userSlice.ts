import { createSlice } from "@reduxjs/toolkit";

type UserParent = {
  token: string;
  user: User;
};

type User = {
  id: number;
  email: string;
  name: string;
  points: number;
  personal_code: string;
  other_code: string;
  created_at: string;
  email_verified_at: string;
  updated_at: string;
};

const initialState: UserParent | any = {
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
