import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/Group";
import customFetch from "../../utils/http/axios";
import { RootState } from "../store";

type GroupState = {
  group: Group;
  isLoading: boolean;
  isGroupCreated: boolean;
  message: string;
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
    winner: "",
    looser: "",
  },
  isLoading: false,
  isGroupCreated: false,
  message: "",
};

export const setGroupInDatabase = createAsyncThunk("group/setGroupInDB", async (partnerCode: string, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/group/${partnerCode}`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getGroupFromDatabase: any = createAsyncThunk("group/getGroupFromDB", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/group`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const groupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setGroupInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGroupInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(setGroupInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(getGroupFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.isGroupCreated = false;
      })
      .addCase(getGroupFromDatabase.fulfilled, (state, { payload }) => {
        state.group = payload.data[0];
        state.isLoading = false;
        state.isGroupCreated = true;
      })
      .addCase(getGroupFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isGroupCreated = false;
      });
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
