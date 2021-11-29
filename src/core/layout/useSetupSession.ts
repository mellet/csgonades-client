import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "../../favorites/data/FavoriteApi";
import { addAllFavoritesAction } from "../../favorites/data/FavoriteSlice";
import { AuthApi } from "../authentication/AuthApi";
import { setTokenAction, setUserAction } from "../authentication/AuthSlice";
import { trySignInFunc } from "../authentication/useOnSignIn";
import { useSignOut } from "../authentication/useSignOut";
import { useApiStatus } from "../global/hooks/useApiStatus";
import { useDisplayToast } from "../toasts/hooks/useDisplayToast";

export const useSetupSession = (): void => {
  const signOut = useSignOut();
  const { setApiOffline, setApiOnline, apiStatus } = useApiStatus();
  const displayToast = useDisplayToast();
  const dispatch = useDispatch();

  const initSession = useCallback(async () => {
    try {
      if (apiStatus === "offline") {
        return;
      }
      const { authenticated } = await AuthApi.setSessionCookie();
      setApiOnline();

      if (!authenticated) {
        return signOut();
      }

      const { userDetails, userToken } = await trySignInFunc();

      if (!userDetails || !userToken) {
        return signOut();
      }

      dispatch(setTokenAction(userToken));
      dispatch(setUserAction(userDetails));

      const result = await getUserFavorites(userToken);

      if (result.isOk()) {
        dispatch(addAllFavoritesAction(result.value));
      } else {
        displayToast({
          severity: "warning",
          message:
            "Failed to get your favorites, refresh the page or report this issue on our Discord.",
        });
      }
    } catch (error) {
      console.warn("Failed to setup session", error);
      setApiOffline();
    }

    return;
  }, [displayToast, dispatch, setApiOffline, setApiOnline, signOut, apiStatus]);

  useEffect(() => {
    initSession();
  }, []);
};
