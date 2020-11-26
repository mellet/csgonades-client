import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import { User } from "../../models/User";
import storage from "redux-persist/lib/storage";

export type AuthState = {
  user?: User;
  token?: string;
};

const initialState: AuthState = {};

const authStore = createSlice({
  name: "AuthStore",
  initialState,
  reducers: {
    setTokenAction(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserAction(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    signOutAction(state) {
      state.user = undefined;
      state.token = undefined;
    },
  },
});

const persistConfig: PersistConfig<AuthState> = {
  key: "authStore",
  storage,
};

export const AuthReducer = persistReducer(persistConfig, authStore.reducer);

export const {
  setTokenAction,
  setUserAction,
  signOutAction,
} = authStore.actions;
