import { configureStore } from '@reduxjs/toolkit';
// const authslice = require("./slice/authSlice");
import atuhReducer from '../store/slice/authSlice'

const store = configureStore({
  reducer: {
     auth:atuhReducer
  },
});
export default store;
