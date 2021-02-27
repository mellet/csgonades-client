import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useGetOrUpdateToken } from "../../core/authentication/useGetToken";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { FavoriteApi } from "../../favorites/data/FavoriteApi";
import {
  addAllFavoritesAction,
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
} from "../../favorites/data/FavoriteSlice";
import { NadeApi } from "./NadeApi";

export const useNadeFavoriteActions = () => {
  const dispatch = useDispatch();
  const displayToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();

  const addFavorite = useCallback(
    async (nadeId: string) => {
      dispatch(favoriteInProgressEndAction());
      dispatch(favoriteInProgressBeginAction());

      const token = await getToken();

      if (!token) {
        displayToast({
          severity: "error",
          message:
            "You don't seem to be signed in. Try refreshing the page or try logging in again.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const result = await NadeApi.favoriteNade(nadeId, token);

      if (result.isErr()) {
        displayToast({
          severity: "error",
          message:
            "Failed to add nade as favorite, try again or report this issue on our Discord.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const favorite = result.value;

      dispatch(addFavoriteAction(favorite));
      dispatch(favoriteInProgressEndAction());

      displayToast({
        severity: "success",
        message: "Added to favorites!",
      });
    },
    [dispatch, displayToast, getToken]
  );

  const unFavorite = useCallback(
    async (nadeId: string) => {
      dispatch(favoriteInProgressBeginAction());

      const token = await getToken();

      if (!token) {
        displayToast({
          severity: "error",
          message:
            "You don't seem to be signed in. Try refreshing the page or try logging in again.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const didSucceed = await NadeApi.unFavoriteNade(nadeId, token);

      if (!didSucceed) {
        displayToast({
          severity: "error",
          message:
            "Failed to unfavorite nade, try refreshing the page or report this issue on our Discord.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const favoritesResult = await FavoriteApi.getUserFavorites(token);

      if (favoritesResult.isErr()) {
        displayToast({
          severity: "warning",
          message:
            "Failed to get your favorites. Try refreshing the page or report this error on our Discord.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const favorites = favoritesResult.value;

      dispatch(addAllFavoritesAction(favorites));
      dispatch(favoriteInProgressEndAction());
    },
    [dispatch, getToken, displayToast]
  );

  return {
    addFavorite,
    unFavorite,
  };
};
