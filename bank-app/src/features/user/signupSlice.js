import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignUp } from "../../services/api";

// Default values of states
const initialState = {
  isSuccessful: false,
  hasErrorMessage: false,
  errorMessage: "",
};

export const signUpAsync = createAsyncThunk(
  "signUp",
  async ({ email, password, firstName, lastName }) => {
    const response = await SignUp({ email, password, firstName, lastName });

    return response;
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setHasErrorMessage: (state, action) => {
      state.hasErrorMessage = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsSuccessful: (state, action) => {
      state.isSuccessful = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      // Handle all the status case of the return value of the API
      // Update the state accordingly
      switch (action.payload.status) {
        case 200:
          state.isSuccessful = true;
          state.hasErrorMessage = false;
          state.errorMessage = "";
          break;
        case 400:
          state.isSuccessful = false;
          state.hasErrorMessage = true;
          state.errorMessage = "Invalid fields";
          break;
        case 500:
        case 501:
          state.isSuccessful = false;
          state.hasErrorMessage = true;
          state.errorMessage = "Internal error";
          break;
        default:
          break;
      }
    });
  },
});

// Export of actions (reducer) that allow us to dispatch them
export const { setHasErrorMessage, setErrorMessage, setIsSuccessful } =
  signUpSlice.actions;

// Exports of the selector that allow us to access state
export const selectIsSuccessful = (state) => state.signUp.isSuccessful;
export const selectHasErrorMessage = (state) => state.signUp.hasErrorMessage;
export const selectErrorMessage = (state) => state.signUp.errorMessage;

// Export of the reducer for the store
export default signUpSlice.reducer;
