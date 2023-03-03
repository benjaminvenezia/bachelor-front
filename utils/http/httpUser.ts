import axios from "axios";
import { Task } from "../../store/slices/allTasksSlice";
import { setTasks } from "../../store/slices/activeTasksSlice";
import { Dispatch, useState } from "react";

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const getUserByCode = (token: string, code: string, setAnotherId: any, setLinkMessage: any) => {
  axios
    .get("http://localhost:8000/api/users/" + code, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      //il faut gérer sa avec redux
      setAnotherId(response.data.id);
      setLinkMessage(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @param token The token of the current user, stored in store.
 * @param dispatch The Redux dispatch hook. He can't be invoked here.
 */
export const updateUserPointsInDatabase = (id: number, token: string, points: number, setUpdatePointsMessage: any) => {
  axios
    .patch("http://localhost:8000/api/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        points: points,
      },
    })
    .then((response) => {
      setUpdatePointsMessage(`Bravo vous avez obtenu ${points} points.`);
    })
    .catch((error) => {
      console.log(error);
    });
};
