import { createSlice } from "@reduxjs/toolkit";

type UserParent = {
  token: string;
  user: User;
};

type User = {
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
