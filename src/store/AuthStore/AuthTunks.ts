import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { tokenSelector } from "./AuthSelectors";
import { UserApi } from "../../api/UserApi";
import { setUser, signOutUser, setToken } from "./AuthActions";
import { AuthApi } from "../../api/TokenApi";
import { redirectUserPage } from "../../utils/Common";
import Router from "next/router";
import { addNotificationActionThunk } from "../NotificationStore/NotificationThunks";

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

    if (isFirstSignIn) {
      redirectUserPage(user.steamID);
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
