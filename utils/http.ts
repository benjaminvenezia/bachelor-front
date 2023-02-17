import axios from "axios";

const path = "localhost:8000/api/";

type User = {
  mail: string;
  password: string;
};

export const login = (user: User) => {
  axios.post(path + "login", user);
};
