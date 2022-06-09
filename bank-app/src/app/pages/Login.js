import React from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log("data par ici ", data);
    dispatch(loginAsync(data));
  };

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input {...register("username")} type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="password" id="password" />
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
