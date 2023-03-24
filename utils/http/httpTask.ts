import axios from "axios";
import { Task } from "../../types/Task";
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
