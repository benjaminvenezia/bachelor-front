import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import customFetch from "../../utils/http/axios";

export type ActiveTasksState = {
  activeTasks: Task[];
  isLoading: boolean;
  areTasksFetched: boolean;
  isAnErrorTogglingTheTask: boolean;
};

const initialState: ActiveTasksState = {
  activeTasks: [],
  isLoading: false,
  areTasksFetched: false,
  isAnErrorTogglingTheTask: false,
};

export const setTasksInDatabase: any = createAsyncThunk("activeTasks/setTasksInDatabase", async (tasks: Task[], thunkAPI) => {
  try {
    const data = { tasks: tasks };
    const resp = await customFetch.post(`/tasks/multiple`, JSON.stringify(data));
    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchTasksFromDatabase: any = createAsyncThunk("activeTasks/fetchTasksFromDatabase", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/tasks`);
    return resp.data.data;
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

export const toggleStatusTaskInDatabase = createAsyncThunk("activeTasks/toggleStatusTaskInDatabase", async (id: string, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/tasks/toggle/${id}`);
    return resp.data.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const activeTasksSlice = createSlice({
  name: "activeTasks",
  initialState: initialState,
  reducers: {
    toggleStatus: (state, action) => {
      const { id } = action.payload;
      const taskIndex = state.activeTasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.activeTasks[taskIndex].is_done = !state.activeTasks[taskIndex].is_done;
      }
    },
    addTask: (state, action): any => {
      const tasksFromCategory = action.payload;

      tasksFromCategory.forEach((taskObject: Task) => {
        state.activeTasks.push(taskObject);
      });
    },
    setTasks: (state, action): any => {
      const tasksFromDatabase = action.payload;

      state.activeTasks = tasksFromDatabase;
    },
    removeTask: (state, action) => {
      return {
        ...state,
        activeTasks: state.activeTasks.filter((task) => task.id !== action.payload.id),
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
        state.activeTasks = payload;
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

export const { addTask, removeTask, toggleStatus, setTasks } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
