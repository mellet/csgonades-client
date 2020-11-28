import { AppState } from "../rootReducer";

export const notificationsSelector = (state: AppState) =>
  state.notificationStore.notifications;

export const lastNotificationFetchSelector = (state: AppState) =>
  state.notificationStore.lastFetch;
