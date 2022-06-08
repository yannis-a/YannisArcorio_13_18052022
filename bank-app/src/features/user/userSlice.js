import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  'user/login',
  async (amount) => {
    const response = new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 5000)
  );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: "",
    lastname: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    token: "",
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('user', JSON.stringify(state));
      return { ...state, token: "je suis le token" };
    },
    logout: () => {
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isFetching = true;
        console.log("en train de fetch");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        console.log(action);
        state.token += action.payload.data;
      });
  },
});

export const getToken = (state) => state.user.token;
export const getUser = (state) => state.user;
export const { login, logout } = userSlice.actions;
