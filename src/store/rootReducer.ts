import { combineReducers } from "redux";
import { FavoriteReducer } from "./FavoriteStore/FavoriteReducer";
import { NotificationReducer } from "./NotificationStore/NotificationReducer";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { MapStoreReducer } from "./MapStore/slice";
import TrackerReducer from "../features/tracker/TrackerSlice";
import { SettingsReducer } from "./SettingsStore/SettingsSlice";
import { AuthReducer } from "./AuthStore/AuthSlice";
import { GlobalReducer } from "./GlobalStore/GlobalStore";

const rootReducer = combineReducers({
  authStore: AuthReducer,
  toastStore: ToastReducer,
  favoriteStore: FavoriteReducer,
  globalStore: GlobalReducer,
  notificationStore: NotificationReducer,
  settingsStore: SettingsReducer,
  mapStore: MapStoreReducer,
  trackerStore: TrackerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
