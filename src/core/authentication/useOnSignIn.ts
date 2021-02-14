import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDisplayToast } from "../toasts/hooks/useDisplayToast";
import { setTokenAction, setUserAction, signOutAction } from "./AuthSlice";
import { useGa } from "../../utils/Analytics";
import { User } from "../../users/models/User";
import { dateMinutesAgo } from "../../utils/DateUtils";
import { AuthApi } from "./AuthApi";
import { UserApi } from "../../users/data/UserApi";

export const useOnSignIn = () => {
  const ga = useGa();
  const displayToast = useDisplayToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const login = async () => {
      const { userDetails, userToken } = await trySignInFunc();
      if (!userDetails || !userToken) {
        displayToast({
          message: "Could not sign you in. Report this issue on our Discord.",
          severity: "error",
        });
        dispatch(signOutAction());
        ga.error("singin_failed", false);
        Router.push("/");
        return;
      }

      dispatch(setTokenAction(userToken));
      dispatch(setUserAction(userDetails));

      const isFirstSignIn = checkIsFirstSignIn(userDetails);

      if (isFirstSignIn || userDetails.steamId === "76561198199195838") {
        ga.event({
          category: "auth",
          action: "signin_success",
          label: "new",
        });
        Router.push("/finishprofile");
      } else {
        ga.event({
          category: "auth",
          action: "signin_success",
          label: "returning",
        });
        Router.push("/");
      }
    };
    login();
    console.log("Once");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

function checkIsFirstSignIn(user: User): boolean {
  const minsAgo = dateMinutesAgo(user.createdAt);

  return minsAgo < 2;
}

export async function trySignInFunc() {
  const tokenResult = await AuthApi.refreshToken();

  if (tokenResult.isErr()) {
    return {
      userToken: null,
      userDetails: null,
    };
  }

  const userToken = tokenResult.value;

  const userResult = await UserApi.fetchSelf(userToken);

  if (userResult.isErr()) {
    return {
      userToken: null,
      userDetails: null,
    };
  }

  const user = userResult.value;

  return {
    userToken,
    userDetails: user,
  };
}
