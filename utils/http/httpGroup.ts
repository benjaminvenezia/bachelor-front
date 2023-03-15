import axios from "axios";
import { setGroup } from "../../store/slices/groupSlice";

/**
 *
 * @param idPartner The id of the partner who want link with
 * @param token The token of the current user, stored in store.
 */
export const setGroupInDatabase = (idPartner: number, token: string, setGroupMessage: any): void => {
  try {
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
        setGroupMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching default gages from database");
  }
};

/**
 * Return the group of current logged user.
 * @param token The token of the current user, stored in store.
 */
export const getGroupFromDatabase = (token: string, dispatch: any): void => {
  try {
    axios({
      method: "get",
      url: "http://localhost:8000/api/group/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(setGroup(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching default gages from database");
  }
};
