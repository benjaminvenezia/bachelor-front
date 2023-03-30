import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import customFetch from "../../utils/http/axios";
import { save } from "../../utils/secureStore";

type UserState = {
  token: string;
  user: User;
};

const initialState: UserState | any = {
  user: {},
  isLoading: false,
  isLogged: false,
  isRegistered: false,
  idPartner: null,
  message: null,
};

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const getPartnerByCode: any = createAsyncThunk("user/getPartnerByCode", async (code: string, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/users/${code}`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

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
      .addCase(getPartnerByCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartnerByCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.idPartner = payload.id;
      })
      .addCase(getPartnerByCode.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(setUserPointsInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserPointsInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.points += payload.points;
      })
      .addCase(setUserPointsInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { setUserPoints, setUser, setOtherCode } = userSlice.actions;
export default userSlice.reducer;
