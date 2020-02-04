import Router from "next/router";
import { FavoriteApi } from "../../api/FavoriteApi";
import { AuthApi } from "../../api/TokenApi";
import { UserApi } from "../../api/UserApi";
import { redirectUserPage } from "../../utils/Common";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { addAllFavoritesAction } from "../FavoriteStore/FavoriteActions";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addNotificationActionThunk } from "../ToastStore/ToastThunks";
import { setToken, setUser, signOutUser } from "./AuthActions";
import { tokenSelector } from "./AuthSelectors";

export const serverSideUserInitThunkAction = (
  cookie?: string
): ReduxThunkAction => {
  return async dispatch => {
    const tokenResult = await AuthApi.refreshToken(cookie);

    // User not signed in, make sure store auth store is empty
    if (tokenResult.isErr()) {
      return dispatch(signOutUser());
    }

    const authToken = tokenResult.value;

    dispatch(setToken(authToken));

    // Preload state
    const [userResult, favoriteResult] = await Promise.all([
      UserApi.fetchSelf(authToken),
      FavoriteApi.getUserFavorites(authToken)
    ]);

    if (userResult.isErr() || favoriteResult.isErr()) {
      return dispatch(signOutUser());
    }

    const user = userResult.value;
    const favorites = favoriteResult.value;

    setUser(dispatch, user);
    dispatch(addAllFavoritesAction(favorites));
    return;
  };
};

export const preloadUserThunkAction = (
  isFirstSignIn: boolean
): ReduxThunkAction => {
  return async dispatch => {
    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      console.error(tokenResult.error);
      return;
    }

    const token = tokenResult.value;

    dispatch(setToken(token));

    const userResult = await UserApi.fetchSelf(token);

    if (userResult.isErr()) {
      console.error(userResult.error);
      return;
    }

    const user = userResult.value;

    setUser(dispatch, user);

    GoogleAnalytics.event({
      category: "Login",
      action: "Signed in",
      ignore: user.role !== "administrator"
    });

    if (isFirstSignIn) {
      redirectUserPage(user.steamId);
    } else {
      Router.push("/");
    }
  };
};

export const fetchSignedInUserThunkAction = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch user, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    const userResult = await UserApi.fetchSelf(authToken);

    if (userResult.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: userResult.error.message,
          severity: "error"
        })
      );
    }
    setUser(dispatch, userResult.value);
  };
};

export const signOutUserThunk = (): ReduxThunkAction => {
  return async dispatch => {
    await AuthApi.signOut();
    dispatch(signOutUser());
  };
};
