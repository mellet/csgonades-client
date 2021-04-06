import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";

export type HintState = {
  shownFavoriteHint: boolean;
};

const initialState: HintState = {
  shownFavoriteHint: false,
};

const hintStore = createSlice({
  name: "HintStore",
  initialState,
  reducers: {
    setShownFavoriteHintAction(state) {
      state.shownFavoriteHint = true;
    },
  },
});

export const { setShownFavoriteHintAction } = hintStore.actions;

const persistConfig: PersistConfig<HintState> = {
  key: "HintStore",
  storage,
};

export const HintStoreReducer = persistReducer(
  persistConfig,
  hintStore.reducer
);
