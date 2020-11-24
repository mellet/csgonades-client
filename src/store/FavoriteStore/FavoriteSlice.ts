import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite } from "../../models/Favorite";

export interface FavoritesState {
  favorites: Favorite[];
  favoriteInProgress: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  favoriteInProgress: false,
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
  },
});

export const FavoriteReducer = favoriteSlice.reducer;

export const {
  addAllFavoritesAction,
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
} = favoriteSlice.actions;
