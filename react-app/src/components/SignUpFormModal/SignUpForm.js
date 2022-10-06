import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpForm.css";
import signUpLogo from "./signUpLogo.png";

const SignUpForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        onClose();
      }
    } else {
      setErrors(["Passwords do not match"]);
    }
    // console.log("ERROR")
    // console.log(errors)
    // if (!errors.length) {
    //   onClose();
    // }

    // if (!email.includes("@")) {
    //   setErrors(['Email is not a valid address'])
    // }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signUpFormContainer">
      <div className="signUpLogoDiv">
        <img src={signUpLogo}></img>
        <span className="registerSpan">Create your Account</span>
      </div>
      <div className="innerSignUpFormContainer">
        <form onSubmit={onSignUp} className="signUpForm">
          <div className="errorDiv">
            {errors.map((error, ind) => (
              <div className="errorDiv" key={ind}>
                {" "}
                - {error}
              </div>
            ))}
          </div>
          <div className="signUpUsernameDiv">
            <label>Username</label>
            <input
              className="signUpFormInput"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="signUpEmailDiv">
            <label>Email</label>
            <input
              className="signUpFormInput"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="signUpPasswordDiv">
            <label>Password</label>
            <input
              className="signUpFormInput"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className="signUpPasswordRepeat">
            <label>Repeat Password</label>
            <input
              className="signUpFormInput"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="createAccountDiv">
            <button className="signUpButton" type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
