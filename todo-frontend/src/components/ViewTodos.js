import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { verifyToken, getTodos } from "../APIFunctions";
import Todo from "./Todo";

export default function ViewTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
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

  useEffect(async () => {
    validation();
    const todosTemp = await getTodos(cookies.get("token"));
    setTodos(todosTemp);
    if ((await todos[0]) == false) {
      setErrorMessage(
        "Sorry, we were not able to retrieve your todos. Try again later."
      );
    }
    setLoading(false);
  }, []);

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div class="container">
      {errorMessage ? (
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      ) : null}
      <h1>Hello There,</h1>
      <div class="card">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <div class="card-header">Your Todos:</div>
            <ul class="list-group list-group-flush">
              {todos[1].map((data, index) => {
                console.log(data);
                return (
                  <Todo
                    body={data.body}
                    id={data.id}
                    completion={data.completion}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
