import { Dispatch } from "@reduxjs/toolkit";
import { Gage, addGage, setGages } from "../../store/slices/gagesSlice";
import axios from "axios";

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const fetchGagesFromDatabase = (token: string, dispatch: Dispatch<any>): void => {
  axios
    .get("http://localhost:8000/api/gages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch(setGages(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * add a gage in database and in the store.
 * @param gage The gage you need to persist
 * @param token The token of the current user, stored in store.
 */
export const setGageInDatabase = (gage: Gage, token: string, dispatch: Dispatch): void => {
  axios({
    method: "post",
    url: "http://localhost:8000/api/gages",
    data: {
      id: gage.id,
      title: gage.title,
      description: gage.description,
      is_done: gage.is_done,
      cost: gage.cost,
      category: gage.category,
      day: gage.day,
      month: gage.month,
      year: gage.year,
      date_string: gage.date_string,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      dispatch(addGage(response.data.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
