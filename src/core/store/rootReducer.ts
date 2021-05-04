import { combineReducers } from "redux";
import { ToastReducer } from "../toasts/ToastReducer";
import { MapStoreReducer } from "../../map/data/slice";
import { SettingsReducer } from "../settings/SettingsSlice";
import { AuthReducer } from "../authentication/AuthSlice";
import { GlobalReducer } from "../global/GlobalStore";
import { FavoriteReducer } from "../../favorites/data/FavoriteSlice";
import { HintStoreReducer } from "../../hints/data/HintSlice";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  favoriteStore: FavoriteReducer,
  globalStore: GlobalReducer,
  mapStore: MapStoreReducer,
  settingsStore: SettingsReducer,
  toastStore: ToastReducer,
  hintStore: HintStoreReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
