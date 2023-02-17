import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};
/**
 * This slice store the crucial information for the user.
 */
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      return {
        token: action.payload.token,
      };
    },
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
