import axios from "axios";
const API_URL = "http://localhost:5000/";

export const registerUser = async (name, email, password) => {
  const body = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      body
    );
    return "Success";
  } catch (e) {
    return e.response.data;
  }
};
