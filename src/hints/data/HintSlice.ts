import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";

export type HintState = {
  shownFavoriteHint: boolean;
  shownPositionCopyHint: boolean;
};

const initialState: HintState = {
  shownFavoriteHint: false,
  shownPositionCopyHint: false,
};

const hintStore = createSlice({
  name: "HintStore",
  initialState,
  reducers: {
    setShownFavoriteHintAction(state) {
      state.shownFavoriteHint = true;
    },
    setShownPositionCopyHintAction(state) {
      state.shownPositionCopyHint = true;
    },
  },
});

export const { setShownFavoriteHintAction, setShownPositionCopyHintAction } =
  hintStore.actions;

const persistConfig: PersistConfig<HintState> = {
  key: "HintStore",
  storage,
};

export const HintStoreReducer = persistReducer(
  persistConfig,
  hintStore.reducer
);
