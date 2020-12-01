import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../models/Notification";

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
    markNotificationAsSeenAction(state, action: PayloadAction<string>) {
      for (const notification of state.notifications) {
        if (notification.id === action.payload) {
          notification.viewed = true;
        }
      }
    },
  },
});

export const NotificationReducer = notificationSlice.reducer;

export const {
  addUnreadNotificationsAction,
  markNotificationAsSeenAction,
} = notificationSlice.actions;
