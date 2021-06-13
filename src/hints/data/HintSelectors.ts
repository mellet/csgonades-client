import { AppState } from "../../core/store/rootReducer";

export const shownFavoriteHintSelector = (state: AppState) =>
  state.hintStore.shownFavoriteHint;

export const shownPositionCopyHintSelctor = (state: AppState) =>
  state.hintStore.shownPositionCopyHint;
