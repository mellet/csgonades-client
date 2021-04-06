import { AppState } from "../../core/store/rootReducer";

export const shownFavoriteHintSelector = (state: AppState) =>
  state.hintStore.shownFavoriteHint;
