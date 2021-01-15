import { createSelector } from "reselect";
import { AppState } from "../../core/store/rootReducer";

export const allFavoritesSelector = (state: AppState) =>
  state.favoriteStore.favorites;

export const favoritedNadeIdsSelector = createSelector(
  (state: AppState) => state.favoriteStore.favorites,
  (items) => items.map((f) => f.nadeId)
);

export const favoriteInProgress = (state: AppState) =>
  state.favoriteStore.favoriteInProgress;
