import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const path = "localhost:8000/api/";

type User = {
  email: string;
  password: string;
};

export const getAllTasks = async (token) => {
  const response = await axios
    .get("http://localhost:8000/api/tasks", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(() => {
      return response.data;
    });
  console.log(response.data);
};
