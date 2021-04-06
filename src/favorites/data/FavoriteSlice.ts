import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite } from "../models/Favorite";

export interface FavoritesState {
  favoriteInProgress: boolean;
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favoriteInProgress: false,
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "FavoriteStore",
  initialState,
  reducers: {
    favoriteInProgressBeginAction(state) {
      state.favoriteInProgress = true;
    },
    favoriteInProgressEndAction(state) {
      state.favoriteInProgress = false;
    },
    addAllFavoritesAction(state, action: PayloadAction<Favorite[]>) {
      state.favorites = action.payload;
    },
    addFavoriteAction(state, action: PayloadAction<Favorite>) {
      state.favorites.push(action.payload);
    },
    removeFavoriteAction(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
    },
    resetFavoriteStoreAction(state) {
      state.favoriteInProgress = false;
      state.favorites = [];
    },
  },
});

export const FavoriteReducer = favoriteSlice.reducer;

export const {
  addAllFavoritesAction,
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
  resetFavoriteStoreAction,
} = favoriteSlice.actions;
