import axios from "axios";
const API_URL = "http://localhost:5000/";

export const registerUser = async (name, email, password) => {
  const body = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const res = await axios.post(API_URL + "api/user/register", body);
    return "Success";
  } catch (e) {
    return e.response.data;
  }
};

export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  try {
    const res = await axios.post(API_URL + "api/user/login", body);
    return [true, res.data.token];
  } catch (e) {
    return [false, e.response.data];
  }
};
