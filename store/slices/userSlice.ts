import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import customFetch from "../../utils/http/axios";
import { save } from "../../utils/secureStore";

type UserState = {
  user: User | null;
  isLoading: boolean;
  isLogged: boolean;

  isRegistered: boolean;
  isUserFetched: boolean;
  message: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isLogged: false,

  isRegistered: false,
  message: null,

  isUserFetched: false,
};

export const login: any = createAsyncThunk("user/login", async (access: { email: string; password: string }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/login`, access);
    save("token", resp.data.data.token);
    return resp.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const register: any = createAsyncThunk(
  "user/register",
  async (access: { name: string; email: string; password: string; password_confirmation: string }, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/register`, access);
      save("token", resp.data.data.token);
      return resp.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCurrentUser: any = createAsyncThunk("user/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/users/get/get_current_user`);
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const setUserPointsInDatabase = createAsyncThunk(
  "user/setUserPointsInDatabase",
  async ({ id, points }: { id: string; points: number }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/users/${id}`, { points: points });
      return resp.data.data;
    } catch (error: any) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

/**
 * This slice store the crucial information for the user.
 */
let userSlice = createSlice({
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
      state.user.points += action.payload.points;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isRegistered = true;
        save("token", payload.token);
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isRegistered = false;
        state.message = payload;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isRegistered = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.isLogged = true;
        save("token", payload.token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLogged = false;
      })

      .addCase(setUserPointsInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserPointsInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        //state.user.points += payload.points;
      })
      .addCase(setUserPointsInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.isUserFetched = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isUserFetched = true;

        state.user = payload.currentUser;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isUserFetched = false;
      });
  },
});

export const { setUserPoints, setUser, setOtherCode } = userSlice.actions;
export default userSlice.reducer;
