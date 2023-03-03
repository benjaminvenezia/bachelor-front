import axios from "axios";
import { Task } from "../../store/slices/allTasksSlice";
import { setTasks } from "../../store/slices/activeTasksSlice";
import { Dispatch } from "react";

/**
 *
 * @param idPartner The id of the partner who want link with
 * @param token The token of the current user, stored in store.
 */
export const setGroupInDatabase = (idPartner: number, token: string, setGroupErrorMessage: any): void => {
  axios({
    method: "post",
    url: "http://localhost:8000/api/group/" + idPartner,
    data: {
      idPartner: idPartner,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      setGroupErrorMessage(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
