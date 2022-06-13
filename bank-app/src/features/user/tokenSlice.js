import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { Login } from "../../services/api";

const cookies = new Cookies();
const token = cookies.get("jwtToken");

// Default values of states
const initialState = {
  token: token,
  errorMessage: "",
  hasErrorMessage: false,
};


export const loginAsync = createAsyncThunk(
  "token/login",
  async ({ email, password, remember }) => {
    const response = await Login({ email, password });
    response.remember = remember;

    return response;
  }
);

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = "";
      cookies.remove("jwtToken");
    },
    setHasErrorMessage: (state, action) => {
      state.hasErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // Handle all the status case of the return value of the API
        // Update the state accordingly
        switch (action.payload.status) {
          case 200:
            state.token = action.payload.body.token;

            if (action.payload.remember) {
              const date = new Date();

              date.setDate(date.getDate() + 1);

              cookies.set("jwtToken", state.token, {
                path: "/",
                expires: date,
              });
            } else {
              cookies.set("jwtToken", state.token, { path: "/" });
            }
            break;
          case 400:
            state.token = "";
            state.hasErrorMessage = true;
            state.errorMessage = "Username or password invalid";
            break;
          case 500:
          case 501:
            state.token = "";
            state.hasErrorMessage = true;
            state.errorMessage = "An error occured";
            break;
          default:
            break;
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.token = "";
      });
  },
});

// Export of actions (reducer) that allow us to dispatch them
export const { setToken, resetToken, setHasErrorMessage } = tokenSlice.actions;

// Exports of the selector that allow us to access state
export const selectToken = (state) => state.token.token;
export const selectErrorMessage = (state) => state.token.errorMessage;
export const selectHasErrorMessage = (state) => state.token.hasErrorMessage;

// Export of the reducer for the store
export default tokenSlice.reducer;
