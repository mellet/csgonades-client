import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import { ThemeKeys } from "./Themes";
import storage from "redux-persist/lib/storage";

export type SettingsState = {
  theme: ThemeKeys;
};

const initialState: SettingsState = {
  theme: "light",
};

const settingsStore = createSlice({
  name: "SettingsStore",
  initialState,
  reducers: {
    setThemeAction(state, action: PayloadAction<ThemeKeys>) {
      state.theme = action.payload;
    },
  },
});

const persistConfig: PersistConfig<SettingsState> = {
  key: "settingStore-v2",
  storage,
};

export const SettingsReducer = persistReducer(
  persistConfig,
  settingsStore.reducer
);

export const { setThemeAction } = settingsStore.actions;
