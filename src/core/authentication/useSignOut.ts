import { useCallback } from "react";
import { useFavoritesV2 } from "../../favorites/data/hooks/useFavoritesV2";
import { AuthApi } from "./AuthApi";
import { useSignedInUser } from "./useSignedInUser";

export const useSignOut = () => {
  const { clearSignedInUser } = useSignedInUser();
  const { clearFavorites } = useFavoritesV2();

  const signOutFromApp = useCallback(() => {
    AuthApi.signOut().then(() => {
      clearSignedInUser();
      clearFavorites();
    });
  }, [clearSignedInUser, clearFavorites]);
  return signOutFromApp;
};
