import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type SignInWarningType = "favorite" | "filterpro" | "addnade";

type GlobalState = {
  readonly acceptedCookieConcent: boolean;
  readonly isNavOpen: boolean;
  readonly signInWarning?: SignInWarningType;
  readonly apiOnline: "init" | "online" | "offline";
};

const initialState: GlobalState = {
  isNavOpen: false,
  acceptedCookieConcent: false,
  apiOnline: "init",
};

const globalStore = createSlice({
  name: "GlobalStore",
  initialState,
  reducers: {
    toggleNavigationAction(state) {
      state.isNavOpen = !state.isNavOpen;
    },
    acceptCookieConcentAction(state) {
      state.acceptedCookieConcent = true;
    },
    closeNavigationAction(state) {
      state.isNavOpen = false;
    },
    displaySignInWarningAction(
      state,
      action: PayloadAction<SignInWarningType>
    ) {
      state.signInWarning = action.payload;
    },
    clearSignInWarningAction(state) {
      state.signInWarning = undefined;
    },
    setApiOnlineAction(state) {
      state.apiOnline = "online";
    },
    setApiOfflineAction(state) {
      state.apiOnline = "offline";
    },
  },
});

const persistConfig: PersistConfig<GlobalState> = {
  key: "globalStore",
  storage,
  whitelist: ["acceptedCookieConcent"],
};

export const GlobalReducer = persistReducer(persistConfig, globalStore.reducer);

export const {
  acceptCookieConcentAction,
  clearSignInWarningAction,
  closeNavigationAction,
  displaySignInWarningAction,
  toggleNavigationAction,
  setApiOfflineAction,
  setApiOnlineAction,
} = globalStore.actions;
