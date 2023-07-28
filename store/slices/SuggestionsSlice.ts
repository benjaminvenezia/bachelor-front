import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/http/axios";
import { Suggestion } from "../../types/Suggestion";

export type SuggestionState = {
  suggestions: Suggestion[];
  isLoading: boolean;
  areSuggestionsFetched: boolean;
};

const initialState: SuggestionState = {
  suggestions: [],
  isLoading: false,
  areSuggestionsFetched: false,
};

export const setSuggestionsInDatabase: any = createAsyncThunk("tasks/setTasksInDatabase", async (tasks: Task[], thunkAPI) => {
  try {
    const data = { tasks: tasks };
    const resp = await customFetch.post(`/tasks/multiple`, JSON.stringify(data));
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchSuggestionsFromDatabase: any = createAsyncThunk("tasks/fetchTasksFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/tasks`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const removeTaskFromDatabase = createAsyncThunk("allTasks/removeTaskFromDatabase", async (idTask: string, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/tasks/${idTask}`);
    return resp.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const toggleStatusTaskInDatabase = createAsyncThunk("tasks/toggleStatusTaskInDatabase", async (id: string, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/tasks/toggle/${id}`);
    return resp.data.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: initialState,
  reducers: {
    addTask: (state, action): any => {
      const tasksFromCategory = action.payload;

      tasksFromCategory.forEach((taskObject: Task) => {
        state.tasks.push(taskObject);
      });
    },
    setTasks: (state, action): any => {
      const tasksFromDatabase = action.payload;

      state.tasks = tasksFromDatabase;
    },
    removeTask: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksFromDatabase.pending, (state) => {
        state.isLoading = true;
        state.areTasksFetched = false;
      })
      .addCase(fetchTasksFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = payload;
        state.areTasksFetched = true;
      })
      .addCase(fetchTasksFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.areTasksFetched = false;
      })

      .addCase(toggleStatusTaskInDatabase.rejected, (state, { payload }) => {
        state.isAnErrorTogglingTheTask = true;
      })

      .addCase(removeTaskFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { addTask, removeTask, toggleStatus, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
