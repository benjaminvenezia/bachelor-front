import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Task } from "../store/slices/allTasksSlice";

const path = "localhost:8000/api/";

type User = {
  email: string;
  password: string;
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
