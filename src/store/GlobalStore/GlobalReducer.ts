import { Reducer } from "redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SiteStats } from "../../api/StatsApi";
import { assertNever } from "../../utils/Common";
import { GlobalActions } from "./GlobalActions";

export type GlobalState = {
  readonly stats: SiteStats;
  readonly isNavOpen: boolean;
  readonly acceptedCookieConcent: boolean;
  readonly didTryFetchingCountryCode: boolean;
  readonly countryCode?: string;
  readonly firstRender: boolean;
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
  didTryFetchingCountryCode: false,
  firstRender: true,
};

export const GlobalReducerBase: Reducer<GlobalState, GlobalActions> = (
  state = initialState,
  action
): GlobalState => {
  switch (action.type) {
    case "@@global/ADD_SITE_STATS":
      return {
        ...state,
        stats: action.stats,
      };
    case "@@global/TOGGLE_NAVIGATION":
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };
    case "@@global/CLOSE_NAVIGATION":
      return {
        ...state,
        isNavOpen: false,
      };
    case "@@global/ACCEPT_COOKIE_CONCENT":
      return {
        ...state,
        acceptedCookieConcent: true,
      };
    case "@@global/FIRST_RENDER_COMPLETE":
      return {
        ...state,
        firstRender: false,
      };
    default:
      assertNever(action);
      return state;
  }
};

const persistConfig: PersistConfig<GlobalState> = {
  key: "settingStore",
  whitelist: ["acceptedCookieConcent"],
  storage,
};

export const GlobalReducer = persistReducer(persistConfig, GlobalReducerBase);
