import React, { useState, useContext } from "react";
import { themeRed } from "./ThemeConstants";
import "./LoginModal.css";
import AppContext from "./AppContext";

const LoginModal = (props) => {
  const { isUserLoggedIn, setIsUserLoggedIn, setLoggedInUser } =
    useContext(AppContext);
  const [emailId, setEmailId] = useState("");
  const [showUnregisteredEmailText, setShowUnregisteredEmailText] =
    useState(false);
  const [showEmailIDRegisteredText, setShowEmailIDRegisteredText] =
    useState(false);
  const [showInvalidEmailAlert, setShowInvalidEmailAlert] = useState(false);
  return (
    <div className="loginPortal">
      <div className="loginModal">
        <h1>
          Welcome to <span style={{ color: `${themeRed}` }}>Watchlists</span>
        </h1>
        {showUnregisteredEmailText && (
          <p style={{ color: `${themeRed}` }}>
            This email ID isn't registered yet! Sign Up to start using the app.
          </p>
        )}
        {showEmailIDRegisteredText && (
          <p style={{ color: `${themeRed}` }}>This email ID is already registered. Please log in to the app.</p>
        )}
        {showInvalidEmailAlert && (
          <p style={{ color: `${themeRed}` }}>Please provide a valid email ID!!!</p>
        )}
        <input
          type="email"
          placeholder=" Enter your email ID "
          onChange={(e) => {setEmailId(e.target.value); showInvalidEmailAlert && setShowInvalidEmailAlert(false)}}
          className="inputField"
        />
        <div className="buttonContainer">
          {!showUnregisteredEmailText && (
            <button
              onClick={() => {
                if (localStorage.getItem(emailId)) {
                  console.log("user authenticated");
                  setIsUserLoggedIn(true);
                  setLoggedInUser(localStorage.getItem(emailId));
                } else {
                  console.log("user authentication failed");
                  setShowUnregisteredEmailText(true);
                }
              }}
            >
              Login
            </button>
          )}
          {!showEmailIDRegisteredText && (
            <button
              onClick={() => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(emailId)) {
                  setShowInvalidEmailAlert(true);
                  return
                }
                if (localStorage.getItem(emailId)) {
                  console.log("user already registered");
                  setShowEmailIDRegisteredText(true);
                } else {
                  localStorage.setItem(emailId, emailId.split("@")?.[0]);
                  console.log("user registration successful");
                  setIsUserLoggedIn(true);
                  setLoggedInUser(emailId);
                }
              }}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
