import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FavoriteApi } from "../FavoriteApi";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import {
  addAllFavoritesAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
  removeFavoriteAction,
} from "../FavoriteSlice";

export const useUnfavorite = () => {
  const displayToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const unFavorite = useCallback(
    async (favoriteId: string) => {
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

      dispatch(removeFavoriteAction(favoriteId));

      const result = await FavoriteApi.unFavorite(favoriteId, token);
      if (result.isErr()) {
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

  return unFavorite;
};
