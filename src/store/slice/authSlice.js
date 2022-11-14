import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn:localStorage.getItem("isLoggedIn"),
    user_name:localStorage.getItem("user_name")
  }
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRedux: (state,action) => {
      state.isLoggedIn = "true";
      state.user_name = action.payload.user_name;
      localStorage.setItem("token",action.payload.token);
      localStorage.setItem("isLoggedIn",state.isLoggedIn);
      localStorage.setItem("user_name",state.user_name);
    },
    logoutRedux: (state) => {
      state.isLoggedIn ="false";
      state.user_name = "null";
      localStorage.setItem('isLoggedIn',false);
      localStorage.removeItem('token');
      localStorage.removeItem("user_name");
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginRedux, logoutRedux} = authSlice.actions
export default authSlice.reducer