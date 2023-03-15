import axios from "axios";
import { Dispatch } from "react";
import { setGagesTask } from "../../store/slices/gagesSlice";

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const fetchDefaultGagesFromDatabase = (token: string, dispatch: Dispatch<any>): void => {
  try {
    axios
      .get("http://localhost:8000/api/default_gages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setGagesTask(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching default gages from database");
  }
};
