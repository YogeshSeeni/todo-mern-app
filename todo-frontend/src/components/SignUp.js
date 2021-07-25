import React, { useState } from "react";
import { registerUser } from "../APIFunctions";

export default function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const handleSubmit = async () => {
    if (Boolean(name) && Boolean(email) && Boolean(password)) {
      let response = await registerUser(name, email, password);
      if ((await response) == "Success") {
        setFailureMessage("");
        setSuccessMessage(await response);
      } else {
        console.log(response);
        setFailureMessage(await response);
      }
    } else {
      setFailureMessage("Fill out All fields");
    }
  };

  let name = "";
  let email = "";
  let password = "";

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
      <h2>Sign Up Page</h2>
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter name"
          onChange={(e) => (name = e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter email"
          onChange={(e) => (email = e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          onChange={(e) => (password = e.target.value)}
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Sign Up!
        </button>
      </div>
    </div>
  );
}
