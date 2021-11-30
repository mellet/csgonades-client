import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useAuthToken } from "../../core/authentication/useSession";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
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
  const isSignedIn = useIsSignedIn();
  const { setSignInWarning } = useSignInWarning();
  const dispatch = useDispatch();
  const displayToast = useDisplayToast();
  const authToken = useAuthToken();

  const addFavorite = useCallback(
    async (nadeId: string) => {
      if (!isSignedIn) {
        return setSignInWarning("favorite");
      }

      dispatch(favoriteInProgressEndAction());
      dispatch(favoriteInProgressBeginAction());

      if (!authToken) {
        displayToast({
          severity: "error",
          message:
            "You don't seem to be signed in. Try refreshing the page or try logging in again.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const result = await NadeApi.favoriteNade(nadeId, authToken);

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
    [dispatch, displayToast, authToken, setSignInWarning, isSignedIn]
  );

  const unFavorite = useCallback(
    async (nadeId: string) => {
      if (!isSignedIn) {
        return setSignInWarning("favorite");
      }
      dispatch(favoriteInProgressBeginAction());

      if (!authToken) {
        displayToast({
          severity: "error",
          message:
            "You don't seem to be signed in. Try refreshing the page or try logging in again.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const didSucceed = await NadeApi.unFavoriteNade(nadeId, authToken);

      if (!didSucceed) {
        displayToast({
          severity: "error",
          message:
            "Failed to unfavorite nade, try refreshing the page or report this issue on our Discord.",
        });
        return dispatch(favoriteInProgressEndAction());
      }

      const favoritesResult = await FavoriteApi.getUserFavorites(authToken);

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
    [dispatch, authToken, displayToast, setSignInWarning, isSignedIn]
  );

  return {
    addFavorite,
    unFavorite,
  };
};
