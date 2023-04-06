import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/Group";
import customFetch from "../../utils/http/axios";
import { RootState } from "../store";

type GroupState = {
  group: Group | null;
  isLoading: boolean;
  isGroupCreated: boolean;
  isGroupLoaded: boolean;
  message: string;
};

const initialState: GroupState = {
  group: null,
  isLoading: false,
  isGroupCreated: false,
  isGroupLoaded: false,
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
    resetGroupStore: (state) => {
      (state.group = null), (state.isLoading = false), (state.isGroupCreated = false), (state.isGroupLoaded = false), (state.message = "");
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
        state.isGroupLoaded = false;
      })
      .addCase(getGroupFromDatabase.fulfilled, (state, { payload }) => {
        state.group = payload[0];
        state.isLoading = false;
        state.isGroupCreated = true;
        state.isGroupLoaded = true;
      })
      .addCase(getGroupFromDatabase.rejected, (state, { payload }) => {
        state.group = payload[0];
        state.isLoading = false;
        state.isGroupCreated = false;
        state.isGroupLoaded = false;
      });
  },
});

export const { setGroup, resetGroupStore } = groupSlice.actions;
export default groupSlice.reducer;
