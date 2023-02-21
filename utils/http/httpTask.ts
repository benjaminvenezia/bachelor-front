import axios from "axios";
import { Task } from "../../store/slices/allTasksSlice";
import { setTasks } from "../../store/slices/activeTasksSlice";
import { Dispatch } from "react";

/**
 *
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const fetchTasks = (token: string, dispatch: Dispatch<any>) => {
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
};

/**
 *
 * @param tasks An array of Task objects
 * @param token The token of the current user, stored in store.
 */
export const setTasksInDatabase = (tasks: Task[], token: string) => {
  tasks.map((task: Task) => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/tasks",
      data: {
        title: task.title,
        description: "rédigé manuellment",
        category: task.category,
        reward: task.reward,
        isDone: task.isDone,
        associated_day: task.associatedDay,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  });
};
