import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../models/Notification";

type NotificationState = {
  readonly lastFetch?: string; // Datetime string
  readonly loading: boolean;
  readonly notifications: Notification[];
};

const initialState: NotificationState = {
  loading: false,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "NotificationStore",
  initialState,
  reducers: {
    addUnreadNotificationsAction(state, action: PayloadAction<Notification[]>) {
      state.lastFetch = new Date().toString();
      state.notifications = action.payload;
    },
    markNotificationsAsViewedAction(state) {
      for (const notification of state.notifications) {
        notification.viewed = true;
      }
    },
    resetNotificationStoreAction(state) {
      state.loading = initialState.loading;
      state.notifications = initialState.notifications;
    },
  },
});

export const NotificationReducer = notificationSlice.reducer;

export const {
  addUnreadNotificationsAction,
  markNotificationsAsViewedAction,
  resetNotificationStoreAction,
} = notificationSlice.actions;
