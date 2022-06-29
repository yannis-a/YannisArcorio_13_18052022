import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import {
  profileAsync,
  selectIsTokenValid,
  selectUser,
  setEditMode,
} from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";
import { selectToken } from "../../features/user/tokenSlice";
import { Account } from "../components/Account";
import { Edit } from "../components/Edit";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isTokenValid = useAppSelector(selectIsTokenValid);

  useEffect(() => {
    async function getProfileData() {
      dispatch(profileAsync(token));
    }

    getProfileData();
  }, [dispatch, token]);

  function handleDisplayEdit() {
    dispatch(setEditMode(true));
  }

  if (!isTokenValid) {
    return <Navigate to="/logout" />;
  }

  if (user.editMode) {
    return (
      <main className="main">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName} !
          </h1>
        </div>
        <Edit
          firstName={user.firstName}
          lastName={user.lastName}
          token={token}
        />
        <h2 className="sr-only">Accounts</h2>
        <Account />
      </main>
    );
  }

  if (user.hasErrorMessage) {
    return (
      <main className="main">
        <span className="profile-internal-error">{user.hasErrorMessage}</span>
        <h2 className="sr-only">Accounts</h2>
        <Account />
      </main>
    );
  }

  return (
    <div className="main">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}
        </h1>
        <button className="edit-button" onClick={() => handleDisplayEdit()}>
          Edit Name
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
    </div>
  );
};

export default Profile;
