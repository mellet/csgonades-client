import { combineReducers } from "redux";
import { ToastReducer } from "./ToastStore/ToastReducer";
import { MapStoreReducer } from "./MapStore/slice";
import TrackerReducer from "../features/tracker/TrackerSlice";
import { SettingsReducer } from "./SettingsStore/SettingsSlice";
import { AuthReducer } from "./AuthStore/AuthSlice";
import { GlobalReducer } from "./GlobalStore/GlobalStore";
import { FavoriteReducer } from "./FavoriteStore/FavoriteSlice";
import { NotificationReducer } from "./NotificationStore/NotificationSlice";

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
