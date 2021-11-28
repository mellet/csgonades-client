import { combineReducers } from "redux";
import { ToastReducer } from "../toasts/ToastReducer";
import { SettingsReducer } from "../settings/SettingsSlice";
import { AuthReducer } from "../authentication/AuthSlice";
import { GlobalReducer } from "../global/GlobalStore";
import { FavoriteReducer } from "../../favorites/data/FavoriteSlice";
import { HintStoreReducer } from "../../hints/data/HintSlice";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  favoriteStore: FavoriteReducer,
  globalStore: GlobalReducer,
  settingsStore: SettingsReducer,
  toastStore: ToastReducer,
  hintStore: HintStoreReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
