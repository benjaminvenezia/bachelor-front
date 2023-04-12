import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Gage } from "../../types/Gage";
import { GageTask } from "../../types/GageTask";
import customFetch from "../../utils/http/axios";

/**
 * The GageTask is the complementary part of Gage, user can select trough them.
 */

type GagesState = {
  gagesAssociatedToUsers: Gage[];
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

const gagesSlice = createSlice({
  name: "gages",
  initialState: initialState,
  reducers: {
    // setGages: (state, action) => {
    //   state.gages = action.payload;
    // },
    // setGagesTask: (state, action) => {
    //   state.gagesTask = action.payload;
    // },
    // addGage: (state, action) => {
    //   state.gages.push(action.payload);
    // },
    /** Used in GageScreen to dynamically update the gageTask when user select a category. */
    filterGageTask: (state, action) => {
      state.gagesTaskFiltered = state.gagesTask.filter((item) => item.category === action.payload.category);
    },
    sortByDate: (state) => {
      state.gagesAssociatedToUsers = state.gagesAssociatedToUsers.sort(
        (g1: Gage, g2: Gage) => new Date(g1.date_string).getTime() - new Date(g2.date_string).getTime()
      );
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
      });
  },
});

export const {
  filterGageTask,
  sortByDate,
  setTheGageBeforeSendingDatabase,
  setCategoryGageSelection,
  setGageTaskId,
  removeGageTaskId,
  setDate,
} = gagesSlice.actions;
export default gagesSlice.reducer;
