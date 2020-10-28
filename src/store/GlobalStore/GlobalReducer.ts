import { createReducer } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SiteStats } from "../../api/StatsApi";
import {
  acceptCookieConcentAction,
  addSiteStatsAction,
  SignInWarningType,
  toggleNavigationAction,
  closeNavigationAction,
  displaySignInWarningAction,
  clearSignInWarningAction,
} from "./GlobalActions";

export type GlobalState = {
  readonly stats: SiteStats;
  readonly isNavOpen: boolean;
  readonly acceptedCookieConcent: boolean;
  readonly signInWarning?: SignInWarningType;
};

const initialState: GlobalState = {
  stats: {
    numNades: 0,
    numUsers: 0,
    numPending: 0,
    ezoicEnabled: false,
  },
  isNavOpen: false,
  acceptedCookieConcent: false,
};

export const GlobalReducerBase = createReducer(initialState, (builder) =>
  builder
    .addCase(toggleNavigationAction, (state) => {
      state.isNavOpen = !state.isNavOpen;
    })
    .addCase(addSiteStatsAction, (state, action) => {
      state.stats = action.payload;
    })
    .addCase(acceptCookieConcentAction, (state) => {
      state.acceptedCookieConcent = true;
    })
    .addCase(closeNavigationAction, (state) => {
      state.isNavOpen = false;
    })
    .addCase(displaySignInWarningAction, (state, action) => {
      state.signInWarning = action.payload;
    })
    .addCase(clearSignInWarningAction, (state) => {
      state.signInWarning = undefined;
    })
);

const persistConfig: PersistConfig<GlobalState> = {
  key: "globalStore",
  whitelist: ["acceptedCookieConcent"],
  storage,
};

export const GlobalReducer = persistReducer(persistConfig, GlobalReducerBase);
