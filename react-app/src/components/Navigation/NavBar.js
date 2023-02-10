import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal (unused)";
import "./NavBar.css";
// import logo from "./logo.png";
import raydittLogo from './raydditlogo.png';
import darkModeLogo from './darkModeLogo.png'
import DarkModeButton from "../DarkMode";

const NavBar = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [loginFormModalIsOpen, setLoginFormModalIsOpen] = useState(false);
  const [signUpFormModalIsOpen, setSignUpFormModalIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const signUpPage = (subredditId) => {
    let path = `/sign-up`;
    history.push(path);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="rightNav">
          <ProfileButton user={sessionUser} />
          <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div id="rightNav">
        <button className="signUpButton" onClick={signUpPage}>
          {" "}
          Sign up
          {/* <Link to="/sign-up">Sign Up</Link> */}
        </button>
        <SignUpFormModal
          isOpen={signUpFormModalIsOpen}
          modalToggle={setSignUpFormModalIsOpen}
        />
        <button
          className="signInButton"
          onClick={() => setLoginFormModalIsOpen(true)}
        >
          {/* <Link to="/login">Log in</Link> */}
          Log In
        </button>
        <LoginFormModal
          isOpen={loginFormModalIsOpen}
          modalToggle={setLoginFormModalIsOpen}
        />
      </div>
    );
  }
  return (
    <nav>
      <div id="navBarContainer">
        <div id="navBar">
          <div id="logo_div">
            <NavLink exact to="/">
              {/* <img src={logo} alt="rayddit"></img> */}
              <img className="raydditLogo" src={darkMode ? darkModeLogo : raydittLogo} alt='raydditlogo'></img>
            </NavLink>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
