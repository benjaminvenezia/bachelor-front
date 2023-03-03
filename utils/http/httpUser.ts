import axios from "axios";
import { Task } from "../../store/slices/allTasksSlice";
import { setTasks } from "../../store/slices/activeTasksSlice";
import { Dispatch, useState } from "react";

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const getUserByCode = (token: string, code: string, setAnotherId: any, setLinkErrorMessage: any) => {
  axios
    .get("http://localhost:8000/api/users/" + code, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //il faut gérer sa avec redux
      setAnotherId(response.data.id);
      setLinkErrorMessage(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};
