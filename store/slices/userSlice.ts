import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import customFetch from "../../utils/http/axios";
import { deleteValueFor, save } from "../../utils/secureStore";

type UserState = {
  user: any | User | null;
  isLoading: boolean;
  isLogged: boolean;

  isRegistered: boolean;
  isUserFetched: boolean;
  message: string | null;
  code: number | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isLogged: false,
  isRegistered: false,
  message: null,

  isUserFetched: false,
  code: null,
};

export const login: any = createAsyncThunk("user/login", async (access: { email: string; password: string }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/login`, access);
    return resp.data.data;
  } catch (error: any) {
    console.log("erreur login");
    return thunkAPI.rejectWithValue(error.response.data.details);
  }
});

export const register: any = createAsyncThunk(
  "user/register",
  async (access: { name: string; email: string; password: string; password_confirmation: string }, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/register`, access);
      return resp.data;
    } catch (error: any) {
      console.log("erreur register: ", error.response);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCurrentUser: any = createAsyncThunk("user/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/users/get/get_current_user`);
    return resp.data;
  } catch (error: any) {
    console.log("erreur fetchCurrentUser");
    console.log(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const setUserPointsInDatabase = createAsyncThunk(
  "user/setUserPointsInDatabase",
  async ({ id, points }: { id: number; points: number }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/users/${id}`, { points: points });

      return resp.data;
    } catch (error: any) {
      console.log("erreur setUserPointsInDatabase");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const setUserPointsGageInDatabase = createAsyncThunk(
  "user/setUserPointsGageInDatabase",
  async ({ id, points_gage }: { id: number; points_gage: number }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/users/${id}`, { points_gage: points_gage });

      return resp.data;
    } catch (error: any) {
      console.log("erreur setUserPointsGageInDatabase: ", error.response);
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
    setOtherCode: (state, action) => {
      return {
        ...state,
        other_code: action.payload.other_code,
      };
    },
    incrementPointsInStore: (state, action) => {
      state.user.points += action.payload.points;
    },
    decrementPointsInStore: (state, action) => {
      state.user.points -= action.payload.points;
    },
    logoutUser: (state) => {
      const logout = async () => {
        await deleteValueFor("token");
      };

      logout();

      state.user = null;
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.data.user;
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
        state.code = payload.code;
        save("token", payload.token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLogged = false;
        state.message = payload;
        state.code = payload.code;

        console.log(payload);
      })

      .addCase(setUserPointsInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserPointsInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
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
        state.user = payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isUserFetched = false;
      });
  },
});

export const { incrementPointsInStore, decrementPointsInStore, setOtherCode, logoutUser } = userSlice.actions;
export default userSlice.reducer;
