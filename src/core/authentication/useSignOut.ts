import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthApi } from "./AuthApi";
import { resetFavoriteStoreAction } from "../../favorites/data/FavoriteSlice";
import { useSignedInUser } from "./useSignedInUser";

export const useSignOut = () => {
  const { signOut } = useSignedInUser();
  const dispatch = useDispatch();
  const signOutFromApp = useCallback(() => {
    AuthApi.signOut().then(() => {
      signOut();
      dispatch(resetFavoriteStoreAction());
    });
  }, [dispatch, signOut]);
  return signOutFromApp;
};
