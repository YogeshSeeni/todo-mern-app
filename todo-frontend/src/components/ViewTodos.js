import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ViewTodos() {
  const cookies = new Cookies();
  const history = useHistory();

  if (cookies.get("token") == undefined) {
    history.push("/login");
  }

  return <div>Todos Screen</div>;
}
