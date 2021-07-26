import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AddTodo() {
  const cookies = new Cookies();
  const history = useHistory();

  if (cookies.get("token") == undefined) {
    history.push("/login");
  }

  return <div>Add Todo Screen</div>;
}
