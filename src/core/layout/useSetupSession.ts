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
        console.log("# Api offline");
        return;
      }
      const { authenticated } = await AuthApi.setSessionCookie();
      setApiOnline();

      if (!authenticated) {
        console.log("# Session setup, not signed in");
        return signOut();
      }

      const { userDetails, userToken } = await trySignInFunc();

      if (!userDetails || !userToken) {
        console.log("# Token expired, signing out");
        return signOut();
      }

      dispatch(setTokenAction(userToken));
      dispatch(setUserAction(userDetails));
      console.log("# Signed in user");

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
      console.warn("# Failed to setup session", error);
      setApiOffline();
    }

    return;
  }, [displayToast, dispatch, setApiOffline, setApiOnline, signOut, apiStatus]);

  useEffect(() => {
    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Force reload after long idle to get latest version of website
  // TODO: Do request to backend to check if we need to reload instead
  useEffect(() => {
    const minutes = 30;
    const timer = setTimeout(() => {
      console.log("# Force refreshing site");
      location.reload();
    }, 1000 * 60 * minutes);
    return () => clearTimeout(timer);
  }, []);
};
