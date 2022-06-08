import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken, login, getUser, logout, loginAsync } from "../../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const onSubmit = () => {
    dispatch(loginAsync("salut"));
  };
  const onLogout = () => {
    dispatch(logout());
  };
  console.log(user);
  console.log(token);
  return (
    <div className="main bg-dark">
      <button className="sign-in-button" onClick={onLogout}>
            logout
          </button>
          <button className="sign-in-button" onClick={onSubmit}>
            login
          </button>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={onSubmit} method="POST">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
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
