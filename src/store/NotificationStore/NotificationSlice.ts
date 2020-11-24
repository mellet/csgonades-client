import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../models/Notification";

type NotificationState = {
  readonly notifications: Notification[];
  readonly loading: boolean;
  readonly lastFetch?: Date;
};

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

const notificationSlice = createSlice({
  name: "NotificationStore",
  initialState,
  reducers: {
    addUnreadNotificationsAction(state, action: PayloadAction<Notification[]>) {
      state.lastFetch = new Date();
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
