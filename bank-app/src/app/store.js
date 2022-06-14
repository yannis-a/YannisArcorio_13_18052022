import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "../features/user/userSlice"
import { tokenSlice } from "../features/user/tokenSlice"
import { signUpSlice } from "../features/user/signupSlice"
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
    signUp: signUpSlice.reducer
  },
})
