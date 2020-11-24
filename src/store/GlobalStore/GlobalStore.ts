import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import { SiteStats } from "../../api/StatsApi";
import storage from "redux-persist/lib/storage";

export type SignInWarningType = "favorite" | "filterpro" | "vote";

type GlobalState = {
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

const globalStore = createSlice({
  name: "GlobalStore",
  initialState,
  reducers: {
    toggleNavigationAction(state) {
      state.isNavOpen = !state.isNavOpen;
    },
    addSiteStatsAction(state, action: PayloadAction<SiteStats>) {
      state.stats = action.payload;
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
  },
});

const persistConfig: PersistConfig<GlobalState> = {
  key: "globalStore",
  whitelist: ["acceptedCookieConcent"],
  storage,
};

export const GlobalReducer = persistReducer(persistConfig, globalStore.reducer);

export const {
  toggleNavigationAction,
  addSiteStatsAction,
  acceptCookieConcentAction,
  clearSignInWarningAction,
  closeNavigationAction,
  displaySignInWarningAction,
} = globalStore.actions;
