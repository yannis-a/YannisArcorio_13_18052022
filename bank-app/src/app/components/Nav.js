import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector(getUser);

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
      {user.isSuccess ? (
        <div>
          <a className="main-nav-item" href="./user">
            <FontAwesomeIcon icon={faUserCircle} />
            Tony
          </a>
          <a className="main-nav-item" href="/">
            <FontAwesomeIcon icon={faSignOut} />
            Sign Out
          </a>
        </div>
      ) : (
        <div>
          <a className="main-nav-item" href="./login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
};

export default Nav;
