import React, { useState } from "react";
import { loginUser } from "../APIFunctions";
import Cookies from "universal-cookie";

export default function Login() {
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const cookies = new Cookies();

  const handleSubmit = async () => {
    const res = await loginUser(email, password);
    const date = new Date();
    if (rememberMe) {
      date.setDate(date.getDate() + 7);
    } else {
      date.setTime(date.getTime() + 30 * 60 * 1000);
    }
    if ((await res[0]) == true) {
      setFailureMessage("");
      setSuccessMessage("Logged In");
      cookies.set("token", res[1], { path: "/", expires: date });
    } else {
      setSuccessMessage("");
      setFailureMessage(await res[1]);
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
      <h2>Login Page</h2>
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
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label class="form-check-label">Remember Me</label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Login!
        </button>
      </div>
    </div>
  );
}
