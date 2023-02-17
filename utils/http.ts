import axios from "axios";

const path = "localhost:8000/api/";

type User = {
  email: string;
  password: string;
};

export const login = (user: User) => {
  const headers = {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    // Authorization: apiKey,
  };

  const { email, password } = user;

  try {
    const p = axios.post(
      "127.0.0.1:8000/api/login",
      {
        email: email,
        password: password,
      },
      { headers }
    );
  } catch (error) {
    console.log(error);
  }
};
