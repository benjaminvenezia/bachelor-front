import axios from "axios";
import { setDefaultTasks } from "../../store/slices/allTasksSlice";
import { Dispatch } from "react";

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const fetchDefaultTasksFromDatabase = (token: string, dispatch: Dispatch<any>): void => {
  axios
    .get("http://localhost:8000/api/default_tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch(setDefaultTasks(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
