import axios from "axios";
const API_URL = "https://mern-todos-api.herokuapp.com/";

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

export const verifyToken = async (token) => {
  const headers = {
    "auth-token": token,
  };
  try {
    const res = await axios.get(API_URL + "verifytoken", { headers: headers });
    return true;
  } catch (e) {
    return false;
  }
};

export const getTodos = async (token) => {
  const headers = {
    "auth-token": token,
  };
  try {
    const res = await axios.get(API_URL + "todo/gettodos", {
      headers: headers,
    });
    return [true, res.data];
  } catch (e) {
    return [false, e.response.data];
  }
};

export const addTodo = async (token, text) => {
  const headers = {
    "auth-token": token,
  };
  const body = {
    body: text,
  };
  try {
    const res = await axios.post(API_URL + "todo/addtodo", body, {
      headers: headers,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteTodo = async (token, id) => {
  const headers = {
    "auth-token": token,
  };
  const body = {
    id: id,
  };
  try {
    const res = await axios.delete(API_URL + "todo/deletetodo", {
      data: body,
      headers: headers,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const editTodo = async (token, id, text) => {
  const headers = {
    "auth-token": token,
  };
  const body = {
    id: id,
    body: text,
  };
  try {
    const res = await axios.put(API_URL + "todo/updatetodo", body, {
      headers: headers,
    });
    return true;
  } catch (e) {
    return false;
  }
};
