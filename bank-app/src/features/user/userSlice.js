import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProfile, UpdateProfile } from "../../services/api";

const initialState = {
  firstName: "",
  lastName: "",
  editMode: false,
  errorMessage: "",
  hasErrorMessage: false,
  isTokenValid: true,
};

export const profileAsync = createAsyncThunk("user/profile", async (token) => {
  const response = await GetProfile(token);

  return response;
});

export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async ({ firstName, lastName, token }) => {
    const response = await UpdateProfile({ firstName, lastName, token });

    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.firstName = "";
      state.lastName = "";
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setEditHasErrorMessage: (state, action) => {
      state.hasErrorMessage = action.payload;
    },
    resetTokenValidity: (state) => {
      state.isTokenValid = true;
    },
  },
  // Handle all the status case of the return value of the API
  // Update the state accordingly
  extraReducers: (builder) => {
    builder
      .addCase(profileAsync.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case 200:
            state.firstName = action.payload.body.firstName;
            state.lastName = action.payload.body.lastName;
            state.hasErrorMessage = false;
            state.errorMessage = "";
            state.isTokenValid = true;
            break;
          case 401:
            state.isTokenValid = false;
            break;
          case 500:
          case 501:
            state.hasErrorMessage = true;
            state.errorMessage = "Internal Server Error";
            break;
          default:
            break;
        }
      })
      .addCase(profileAsync.rejected, (state) => {
        state.firstName = "";
        state.lastName = "";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case 200:
            state.firstName = action.payload.body.firstName;
            state.lastName = action.payload.body.lastName;
            state.editMode = false;
            state.hasErrorMessage = false;
            state.errorMessage = "Please fill both first and last name";
            break;
          case 400:
            state.hasErrorMessage = true;
            state.errorMessage = "Invalid fields";
            break;
          case 500:
          case 501:
            state.hasErrorMessage = true;
            state.errorMessage = "Internal error";
            break;
          default:
            break;
        }
      })
      .addCase(updateProfileAsync.rejected, () => {
        console.log("Your profile update was rejected.");
      });
  },
});

// Export of actions (reducer) that allow us to dispatch them
export const {
  resetUser,
  setEditMode,
  setEditHasErrorMessage,
  resetTokenValidity,
} = userSlice.actions;
// Exports of the selector that allow us to access state
export const selectUser = (state) => state.user;
export const selectIsTokenValid = (state) => state.user.isTokenValid;
// Export of the reducer for the store
export default userSlice.reducer;
