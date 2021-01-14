import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFavorites } from "../api/FavoriteApi";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";
import { setTokenAction, setUserAction, signOutAction } from "./AuthSlice";
import { addAllFavoritesAction } from "../../store/FavoriteStore/FavoriteSlice";
import axios from "axios";
import { trySignInFunc } from "./useOnSignIn";

export const usePreloadUser = () => {
  const displayToast = useDisplayToast();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const backendOnline = await backendIsOnline();

      if (!backendOnline) {
        displayToast({
          severity: "warning",
          message:
            "Looks like our servers are slow or offline. If you see this issue please report it on our Discord.",
        });
        // Don't try signing in if backend is offline
        return;
      }

      const { userDetails, userToken } = await trySignInFunc();

      if (!userDetails || !userToken) {
        dispatch(signOutAction());
        return;
      }

      dispatch(setUserAction(userDetails));
      dispatch(setTokenAction(userToken));

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
    })();
  }, [dispatch, displayToast]);
};

async function backendIsOnline() {
  try {
    await axios.get("https://api.csgonades.com/status");
    return true;
  } catch (error) {
    return false;
  }
}
