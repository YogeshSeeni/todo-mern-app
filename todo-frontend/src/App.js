import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import ViewTodos from "./components/ViewTodos";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddTodo from "./components/AddTodo";
import Logout from "./components/Logout";

function App() {
  const cookies = new Cookies();

  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            MERN APP
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            {cookies.get("token") != undefined ? (
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">
                    Todos
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/addtodo">
                    Add Todos
                  </a>
                </li>
              </ul>
            ) : null}
            {cookies.get("token") == undefined ? (
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </ul>
            ) : null}
            {cookies.get("token") != undefined ? (
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/logout">
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/addtodo">
          <AddTodo />
        </Route>
        <Route path="/">
          <ViewTodos />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
