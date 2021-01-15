import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import { SiteStats } from "../../core/api/StatsApi";
import storage from "redux-persist/lib/storage";

export type SignInWarningType = "favorite" | "filterpro" | "addnade";

type GlobalState = {
  readonly acceptedCookieConcent: boolean;
  readonly isNavOpen: boolean;
  readonly signInWarning?: SignInWarningType;
  readonly stats: SiteStats;
};

const initialState: GlobalState = {
  stats: {
    ezoicEnabled: false,
    numNades: 0,
    numPending: 0,
    numUsers: 0,
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
  storage: storage,
  whitelist: ["acceptedCookieConcent"],
};

export const GlobalReducer = persistReducer(persistConfig, globalStore.reducer);

export const {
  acceptCookieConcentAction,
  addSiteStatsAction,
  clearSignInWarningAction,
  closeNavigationAction,
  displaySignInWarningAction,
  toggleNavigationAction,
} = globalStore.actions;
