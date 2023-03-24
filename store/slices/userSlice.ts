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
  idPartner: null,
};

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const getPartnerByCode: any = createAsyncThunk("user/getPartnerByCode", async (code: string, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/users/${code}`);
    console.log("getPartnerByCode thunk : ", resp.data);
    return resp.data;
  } catch (error: any) {
    console.log("Erreur dans getUserByCode");
    console.log(error);
    return thunkAPI.rejectWithValue("Une erreur s'est produite lors de la récupération de l'autre utilisateur");
  }
});

export const login: any = createAsyncThunk("user/login", async (access: { email: string; password: string }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/login`, access);
    save("token", resp.data.data.token);
    return resp.data.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue("Une erreur s'est produite lors de la connexion");
  }
});

export const register: any = createAsyncThunk(
  "user/register",
  async (access: { name: string; email: string; password: string; password_confirmation: string }, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/register`, access);
      save("token", resp.data.data.token);
      console.log("REGISTER HOMIE: ", resp.data.data);
      return resp.data.data;
    } catch (error: any) {
      console.log(error.response);
      return thunkAPI.rejectWithValue("Une erreur s'est produite lors de la connexion");
    }
  }
);

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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        save("token", payload.token);
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;

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
      })

      .addCase(getPartnerByCode.pending, (state) => {
        state.isLoading = true;

        console.log("MAKAAO", state);
      })
      .addCase(getPartnerByCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("FRaNCHE COMPTEE!: ", payload);
        state.idPartner = payload.id;
        // toast.success(`Salut ${payload.data.user.name}`);
      })
      .addCase(getPartnerByCode.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload);
      });
  },
});

export const { setUser, setOtherCode, setUserPoints } = userSlice.actions;
export default userSlice.reducer;
