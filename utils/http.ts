import axios from "axios";

const path = "localhost:8000/api/";

type User = {
  email: string;
  password: string;
};

export const getAllTasks = async () => {
  const response = await axios.get("http://localhost:8000/api/tasks");
  console.log(response.data);
};
