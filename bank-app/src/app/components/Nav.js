import React from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import { selectUser, resetUser } from "../../features/user/userSlice";
import { resetToken, selectToken } from "../../features/user/tokenSlice";
import { setIsSuccessful } from "../../features/user/signupSlice";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOut,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  function logOut() {
    dispatch(resetUser());
    dispatch(resetToken());
    dispatch(setIsSuccessful(false));
  }

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      {token ? (
        <div>
          <Link className="main-nav-item" to="user">
            <FontAwesomeIcon icon={faUserCircle} />
            {user.FirstName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="signup">
            <FontAwesomeIcon icon={faUserPlus} />
            Sign up
          </Link>
          <Link className="main-nav-item" to="login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
