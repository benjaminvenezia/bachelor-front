import { createAsyncThunk, createSlice, isDraft } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import customFetch from "../../utils/http/axios";

export type ActiveTasksState = {
  activeTasks: Task[];
  isLoading: boolean;
};

const initialState: ActiveTasksState = {
  activeTasks: [],
  isLoading: false,
};

export const setTasksInDatabase = createAsyncThunk("activeTasks/setTasksInDatabase", async (tasks: Task[], thunkAPI) => {
  try {
    const data = { tasks: tasks };
    const resp = await customFetch.post(`/tasks/multiple`, JSON.stringify(data));

    return resp.data;
  } catch (error: any) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchTasksFromDatabase = createAsyncThunk("activeTasks/fetchTasksFromDatabase", async (_, thunkAPI) => {
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
      return {
        ...state,
        activeTasks: state.activeTasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, is_done: !task.is_done };
          } else {
            return task;
          }
        }),
      };
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
      })
      .addCase(fetchTasksFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.activeTasks = payload;
      })
      .addCase(fetchTasksFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(toggleStatusTaskInDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleStatusTaskInDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(toggleStatusTaskInDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(removeTaskFromDatabase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTaskFromDatabase.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(removeTaskFromDatabase.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { addTask, removeTask, toggleStatus, setTasks } = activeTasksSlice.actions;
export default activeTasksSlice.reducer;
