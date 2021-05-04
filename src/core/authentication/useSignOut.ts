import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthApi } from "./AuthApi";
import { signOutAction } from "./AuthSlice";
import { resetFavoriteStoreAction } from "../../favorites/data/FavoriteSlice";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    AuthApi.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(resetFavoriteStoreAction());
    });
  }, [dispatch]);
  return signOut;
};
