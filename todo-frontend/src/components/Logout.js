import React from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

export default function Logout() {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  const history = useHistory();
  history.push("/login");
  window.location.reload();

  return <div>asdf</div>;
}
