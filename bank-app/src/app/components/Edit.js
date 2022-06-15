import { useAppDispatch, useAppSelector } from "../hook";
import {
  updateProfileAsync,
  setEditMode,
  setEditHasErrorMessage,
  selectUser,
} from "../../features/user/userSlice";

import { useState } from "react";

export function Edit({ firstName, lastName, token }) {
  const dispatch = useAppDispatch();

  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);

  const user = useAppSelector(selectUser);

  let inputsErrorMessage = null;

  function updateProfile() {
    if (newFirstName !== "" && newLastName !== "") {
      dispatch(
        updateProfileAsync({
          firstName: newFirstName,
          lastName: newLastName,
          token: token,
        })
      );
    } else {
      dispatch(setEditHasErrorMessage(true));
    }
  }

  if (user.HasErrorMessage) {
    inputsErrorMessage = <span className="edit-error">{user.ErrorMessage}</span>;
  } else {
    inputsErrorMessage = null;
  }

  return (
    <div className="edit-container">
      {inputsErrorMessage}
      <div className="edit-input-container">
        <input
          type="text"
          className="edit-input"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          type="text"
          className="edit-input"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
      </div>
      <div className="edit-button-container">
        <button className="edit-user-button" onClick={() => updateProfile()}>
          Save
        </button>
        <button
          className="edit-user-button"
          onClick={() => dispatch(setEditMode(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
