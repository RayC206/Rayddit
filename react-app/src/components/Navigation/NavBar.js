import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./NavBar.css";
import logo from "./logo.png";

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [loginFormModalIsOpen, setLoginFormModalIsOpen] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="rightNav">
          {/* <NavLink className="hostSpot" to="/spots/create">
            Become a Host
          </NavLink> */}
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div id="rightNav">
        <button onClick={() => setLoginFormModalIsOpen(true)}>
          <Link to="/login">Log in</Link>
          {/* Log in */}
        </button>
        {/* <LoginFormModal
          isOpen={loginFormModalIsOpen}
          modalToggle={setLoginFormModalIsOpen}
        /> */}
        <button className="signUpButton">
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    );
  }
  return (
    <nav>
      <div id="navBarContainer">
        <div id="navBar">
          <div id="logo_div">
            <NavLink exact to="/">
              <img src={logo} alt="rayddit"></img>
            </NavLink>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
