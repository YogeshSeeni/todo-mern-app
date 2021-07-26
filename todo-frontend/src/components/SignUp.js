import React, { useState } from "react";
import { registerUser } from "../APIFunctions";

export default function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    let response = await registerUser(name, email, password);
    if ((await response) == "Success") {
      setFailureMessage("");
      setSuccessMessage(await response);
    } else {
      setSuccessMessage("");
      setFailureMessage(await response);
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
      <h2>Sign Up Page</h2>
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
