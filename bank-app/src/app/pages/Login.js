import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { Navigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  selectErrorMessage,
  selectToken,
  selectHasErrorMessage,
  loginAsync,
  setHasErrorMessage,
} from "../../features/user/tokenSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const errorMessage = useAppSelector(selectErrorMessage);
  const token = useAppSelector(selectToken);
  const hasErrorMessage = useAppSelector(selectHasErrorMessage);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(loginAsync({ email, password, remember }));
  };

  useEffect(() => {
    async function dispatchSetHasErrorMessage() {
      dispatch(setHasErrorMessage(false));
    }

    dispatchSetHasErrorMessage();
  }, [dispatch]);

  let displayErrorMessage;
  if (hasErrorMessage) {
    displayErrorMessage = <p className="sign-in-error">{errorMessage}</p>;
  } else {
    displayErrorMessage = null;
  }

  if (token) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="main">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        {displayErrorMessage}
        <form onSubmit={onSubmit} method="POST">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
