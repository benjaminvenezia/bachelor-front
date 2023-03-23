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
};

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */

export const getUserByCode: any = createAsyncThunk("user/getUserByCode", async (code: string, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/users/${code}`);
    console.log("VIVE LE CANADA : ", resp.data);
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue("Une erreur s'est produite lors de la récupération de l'autre utilisateur");
  }
});

export const login: any = createAsyncThunk("user/login", async (access: { email: string; password: string }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/login`, access);

    return resp.data.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue("Une erreur s'est produite lors de la connexion");
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("this is payload: ", payload.token);
        state.user = payload.user;
        state.isLogged = true;
        save("token", payload.token);
        // state.token = payload.data.token;
        // addTokenToLocalStorage(payload.data.token);
        // addUserToLocalStorage(payload.data.user);
        // toast.success(`Salut ${payload.data.user.name}`);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLogged = false;
        // toast.error(payload);
      });

    // .addCase(getUserByCode.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUserByCode.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.user = payload.data.user;
    //   state.token = payload.data.token;
    //   // addTokenToLocalStorage(payload.data.token);
    //   // addUserToLocalStorage(payload.data.user);
    //   // toast.success(`Salut ${payload.data.user.name}`);
    // })
    // .addCase(getUserByCode.rejected, (state, { payload }) => {
    //   state.isLoading = false;
    //   // toast.error(payload);
    // });
  },
});

export const { setUser, setOtherCode, setUserPoints } = userSlice.actions;
export default userSlice.reducer;
