import { combineReducers } from "redux";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { MapStoreReducer } from "./MapStore/slice";
import TrackerReducer from "../features/tracker/TrackerSlice";
import { SettingsReducer } from "./SettingsStore/SettingsSlice";
import { AuthReducer } from "../core/authentication/AuthSlice";
import { GlobalReducer } from "./GlobalStore/GlobalStore";
import { FavoriteReducer } from "../favorites/data/FavoriteSlice";
import { NotificationReducer } from "./NotificationStore/NotificationSlice";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  favoriteStore: FavoriteReducer,
  globalStore: GlobalReducer,
  mapStore: MapStoreReducer,
  notificationStore: NotificationReducer,
  settingsStore: SettingsReducer,
  toastStore: ToastReducer,
  trackerStore: TrackerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
