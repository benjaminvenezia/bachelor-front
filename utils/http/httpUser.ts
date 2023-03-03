import axios from "axios";
import { setUserPoints } from "../../store/slices/userSlice";

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

export const setUserPointsInDatabase = (id: string, token: string, points: number, dispatch: any): void => {
  axios({
    method: "patch",
    url: "http://localhost:8000/api/users/" + id,
    data: {
      points: points,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // dispatch(setUserPoints({ points: response.data.points }));
    })
    .catch((error) => {
      console.log(error);
    });
};
