import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { verifyToken } from "../APIFunctions";

export default function AddTodo() {
  const cookies = new Cookies();
  const history = useHistory();
  const validation = async () => {
    if (cookies.get("token") == undefined) {
      history.push("/login");
    }

    if ((await verifyToken(cookies.get("token"))) == false) {
      cookies.remove("token", { path: "/" });
      history.push("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    validation();
  }, []);

  return <div>Add Todo Screen</div>;
}
