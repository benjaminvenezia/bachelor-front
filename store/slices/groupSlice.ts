import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/Group";
import customFetch from "../../utils/http/axios";

type GroupState = {
  group: Group;
  isLoading: boolean;
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
    winner: "string",
    looser: "string",
  },
  isLoading: false,
};

export const setGroupInDatabase = createAsyncThunk("group/setGroupInDB", async (idPartner: number) => {
  try {
    const resp = await customFetch.post(`/group/${idPartner}`);
    // console.log("set group in db : ", resp.data);

    return resp.data;
  } catch (error) {
    console.log("Erreur dans setGroupInDatabase");
    console.log(error);
    throw new Error("Error fetching default gages from database");
  }
});

export const getGroupFromDatabase = createAsyncThunk("group/getGroupFromDB", async () => {
  try {
    const resp = await customFetch.get(`/group`);
    // console.log("get group from db: ", resp.data);

    return resp.data;
  } catch (error) {
    console.log("Erreur dans getGroupFromDatabase");
    console.log(error);
    throw new Error("Error fetching default gages from database");
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
      })
      .addCase(getGroupFromDatabase.fulfilled, (state, { payload }) => {
        state.group = payload;
        state.isLoading = false;
      })
      .addCase(getGroupFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { setGroup } = groupSlice.actions;
export default groupSlice.reducer;
