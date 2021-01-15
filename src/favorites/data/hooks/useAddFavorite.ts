import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FavoriteApi } from "../FavoriteApi";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import {
  addFavoriteAction,
  favoriteInProgressBeginAction,
  favoriteInProgressEndAction,
} from "../FavoriteSlice";

export const useAddFavorite = () => {
  const displayToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

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

      const result = await FavoriteApi.favorite(nadeId, token);

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
    },
    [dispatch, getToken, displayToast]
  );

  return addFavorite;
};
