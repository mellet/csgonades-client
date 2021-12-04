import { useCallback } from "react";
import { useFavorites } from "../../favorites/data/hooks/useFavorites";
import { AuthApi } from "./AuthApi";
import { useSession } from "./useSession";
import { useSignedInUser } from "./useSignedInUser";

export const useSignOut = () => {
  const { clearSession } = useSession();
  const { clearSignedInUser } = useSignedInUser();
  const { clearFavorites } = useFavorites();

  const signOutFromApp = useCallback(() => {
    AuthApi.signOut().then(() => {
      clearSession();
      clearSignedInUser();
      clearFavorites();
    });
  }, [clearSignedInUser, clearFavorites, clearSession]);
  return signOutFromApp;
};
