import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";
import logo from "../Navigation/logo.png";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginFormContainer">
      <div className="loginLogoDiv">
        <img src={logo}></img>
      </div>
      <div className="loginWelcome">
        <span>Welcome to Rayddit</span>
      </div>
      <div className="innerLoginFormContainer">
        <form onSubmit={onLogin} className="loginForm">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="loginEmailDiv">
            {/* <label htmlFor="email">Email</label> */}
            <input
              className="loginEmailInput"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="loginPasswordDiv">
            {/* <label htmlFor="password">Password</label> */}
            <input
              className="loginPasswordInput"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="loginButtonDiv">
            <button type="submit">Login</button>
            <button
                  className="demoButton"
                  type="submit"
                  onClick={() => {
                    setEmail("demo@aa.io");
                    setPassword("password");
                  }}
                >
                  {" "}
                  Demo User {" "}
                </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
