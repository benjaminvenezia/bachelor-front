import axios from "axios";
import { Task } from "../../store/slices/allTasksSlice";
import { setTasks } from "../../store/slices/activeTasksSlice";
import { Dispatch } from "react";

/**
 *
 * @param idTask id of the task
 * @param token  The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const removeTaskFromDatabase = (idTask: string, token: string): void => {
  axios
    .delete("http://localhost:8000/api/tasks/" + idTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Suppression réussie!");
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const fetchTasksFromDatabase = (token: string, dispatch: Dispatch<any>): void => {
  try {
    axios
      .get("http://localhost:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setTasks(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching tasks from database");
  }
};

/**
 * @param id The id of the task to update
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const toggleStatusTaskInDatabase = (id: string, token: string, actualStatus: boolean): void => {
  try {
    axios({
      method: "patch",
      url: "http://localhost:8000/api/tasks/" + id,
      data: {
        is_done: !actualStatus,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    throw new Error("Error toggling the task");
  }
};

/**
 *
 * @param tasks An array of Task objects
 * @param token The token of the current user, stored in store.
 */
export const setTasksInDatabase = (tasks: Task[], token: string): void => {
  try {
    tasks.map((task: Task) => {
      axios({
        method: "post",
        url: "http://localhost:8000/api/tasks",
        data: {
          id: task.id,
          title: task.title,
          description: "rédigé manuellment",
          category: task.category,
          reward: task.reward,
          is_done: task.is_done,
          path_icon_todo: task.path_icon_todo,
          associated_day: task.associated_day,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error setting tasks in database");
  }
};
