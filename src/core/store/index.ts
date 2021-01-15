/* eslint-disable @typescript-eslint/no-var-requires */

import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { ThunkAction } from "redux-thunk";
import rootReducer, { AppState } from "./rootReducer";

const isProduction = process.env.NODE_ENV === "production";

const applicationStore = configureStore({
  reducer: rootReducer,
  devTools: !isProduction,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

//@ts-ignore
if (process.env.NODE_ENV === "development" && module.hot) {
  //@ts-ignore
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    applicationStore.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof applicationStore.dispatch;

export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;

export default applicationStore;
