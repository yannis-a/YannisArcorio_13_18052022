import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email : username,
        password : password,
      }),
    };
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", options);
      let data = await response.json();
      
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
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
      localStorage.setItem("user", JSON.stringify(state));
      return { ...state, token: "je suis le token" };
    },
    logout: () => {
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.name;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log("action",action);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const getToken = (state) => state.user.token;
export const getUser = (state) => state.user;
export const { login, logout } = userSlice.actions;
