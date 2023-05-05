import { User } from "@prisma/client";
import { RootState } from '../app/store'
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

interface Initial {
  user: User & { token: string } | null,
  isAuth: boolean
}
const initialState: Initial = {
  user: null,
  isAuth: false
}
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (biulder) => {
    biulder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true
    });
    biulder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true
    });
    biulder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true
    });
  }
});
export const { logout } = slice.actions
export default slice.reducer
export const selectAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user