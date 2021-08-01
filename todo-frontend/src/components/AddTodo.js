import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { verifyToken } from "../APIFunctions";
import { addTodo } from "../APIFunctions";

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

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message == "") {
      setFailureMessage("Message cannot be empty");
      return;
    }
    const res = await addTodo(cookies.get("token"), message);
    if ((await res) == true) {
      setFailureMessage("");
      setSuccessMessage(`Added todo with message: "${message}"`);
    } else {
      setSuccessMessage("");
      setFailureMessage("Could not add todo.");
    }
  };

  return (
    <div class="container">
      {successMessage ? (
        <div class="alert alert-success" role="alert">
          {successMessage}
        </div>
      ) : null}
      {failureMessage ? (
        <div class="alert alert-danger" role="alert">
          {failureMessage}
        </div>
      ) : null}
      <form>
        <div class="form-group">
          <label>Add Todo:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter todo"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
            Add Todo!
          </button>
        </div>
      </form>
    </div>
  );
}
