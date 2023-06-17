import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gage } from "../../types/Gage";
import { GageTask } from "../../types/GageTask";
import customFetch from "../../utils/http/axios";

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */

type GagesState = {
  gagesAssociatedToUsers: Gage[];
  gagesAssociatedToUsersSave: Gage[];
  gagesTask: GageTask[];
  gagesTaskFiltered: any;
  gageToAddInDatabase: any;
  isLoading: boolean;
  categoryGageSelection: string | null;
  gageTaskId: number | null;
  gageDay: number | null;
  gageMonth: number | null;
  gageYear: number | null;
  gageDateString: string | null;
  areGagesFetched: boolean;
  areDefaultGagesFetched: boolean;
};

const initialState: GagesState = {
  gagesAssociatedToUsers: [],
  gagesAssociatedToUsersSave: [],
  gagesTask: [],
  gagesTaskFiltered: [],
  gageToAddInDatabase: {},
  isLoading: false,
  categoryGageSelection: null, //The category selected by user when giving a gage
  gageTaskId: null, //The id of selected gagetask to give.
  gageDay: null,
  gageMonth: null,
  gageYear: null,
  gageDateString: null,
  areGagesFetched: false,
  areDefaultGagesFetched: false,
};

export const fetchDefaultGagesFromDatabase: any = createAsyncThunk("defaultGages/fetchDefaultGagesFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/default_gages`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

/**
 * Les gages associés aux utilisateurs
 */
export const fetchGagesFromDatabase: any = createAsyncThunk("gages/fetchGagesFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/gages`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const setGageInDatabase = createAsyncThunk("gages/setGageInDatabase", async (gage: Gage, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/gages`, gage);

    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const validateGageInDatabase = createAsyncThunk("gages/validateGageInDatabase", async (gageId: { gageId: number }, thunkAPI) => {
  try {
    const resp = await customFetch.post(`/gage/validate/${gageId.gageId}`);
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const gagesSlice = createSlice({
  name: "gages",
  initialState: initialState,
  reducers: {
    /** Used in GageScreen to dynamically update the gageTask when user select a category. */
    filterGageTask: (state, action) => {
      state.gagesTaskFiltered = state.gagesTask.filter((item) => item.category === action.payload.category);
    },
    sortByDate: (state) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsers.sort(
        (g1: Gage, g2: Gage) => new Date(g1.date_string).getTime() - new Date(g2.date_string).getTime()
      );
    },
    sortByDateDesc: (state) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsers.sort(
        (g1: Gage, g2: Gage) => new Date(g2.date_string).getTime() - new Date(g1.date_string).getTime()
      );
    },
    sortByUser: (state, action) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsers.filter(
        (gage: Gage) => !gage.is_done && gage.user_name === action.payload.userName
      );
    },
    filterByGagesAreNotDone: (state) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsers.filter((gage: Gage) => !gage.is_done);
    },
    resetGagesAssociatedToUsers: (state) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsersSave;
    },
    setTheGageBeforeSendingDatabase: (state, action) => {
      state.gageToAddInDatabase = action.payload;
    },
    setCategoryGageSelection: (state, action) => {
      state.categoryGageSelection = action.payload.categoryTitle;
    },
    setGageTaskId: (state, action) => {
      state.gageTaskId = action.payload.gageTaskId;
    },
    removeGageTaskId: (state) => {
      state.gageTaskId = null;
    },
    setDate: (state, action) => {
      state.gageDay = action.payload.day;
      state.gageMonth = action.payload.month;
      state.gageYear = action.payload.year;
      state.gageDateString = action.payload.date_string;
    },
    validateGage: (state, action) => {
      state.gagesAssociatedToUsers.map((gage) => (gage.id === action.payload.gageId ? (gage.is_done = true) : ""));
      state.gagesAssociatedToUsersSave.map((gage) => (gage.id === action.payload.gageId ? (gage.is_done = true) : ""));
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchDefaultGagesFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.areDefaultGagesFetched = false;
      })
      .addCase(fetchDefaultGagesFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultGagesFetched = true;
        state.gagesTask = payload;
      })
      .addCase(fetchDefaultGagesFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areDefaultGagesFetched = false;
      })

      .addCase(fetchGagesFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.areGagesFetched = false;
      })
      .addCase(fetchGagesFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areGagesFetched = true;
        state.gagesAssociatedToUsers = payload;
        state.gagesAssociatedToUsersSave = payload;
        state.gagesTaskFiltered = payload;
      })
      .addCase(fetchGagesFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areGagesFetched = false;
      })

      .addCase(setGageInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGageInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.gagesAssociatedToUsers.push(payload);
      })
      .addCase(setGageInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(validateGageInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateGageInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(validateGageInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const {
  filterGageTask,
  sortByDate,
  sortByUser,
  sortByDateDesc,
  filterByGagesAreNotDone,
  resetGagesAssociatedToUsers,
  setTheGageBeforeSendingDatabase,
  setCategoryGageSelection,
  setGageTaskId,
  removeGageTaskId,
  setDate,
  validateGage,
} = gagesSlice.actions;
export default gagesSlice.reducer;
