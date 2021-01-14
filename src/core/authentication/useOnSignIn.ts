import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";
import { setTokenAction, setUserAction } from "./AuthSlice";
import { useAnalytics } from "../../utils/Analytics";
import { User } from "../../models/User";
import { dateMinutesAgo } from "../../utils/DateUtils";
import { AuthApi } from "./AuthApi";
import { UserApi } from "../api/UserApi";

export const useOnSignIn = () => {
  const { event } = useAnalytics();
  const displayToast = useDisplayToast();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { userDetails, userToken } = await trySignInFunc();
      if (!userDetails || !userToken) {
        displayToast({
          message: "Could not sign you in. Report this issue on our Discord.",
          severity: "error",
        });
        event({
          category: "Auth",
          action: "Sign In Failed",
        });
        router.push("/", "/");
        return;
      }

      dispatch(setTokenAction(userToken));
      dispatch(setUserAction(userDetails));

      const isFirstSignIn = checkIsFirstSignIn(userDetails);

      if (isFirstSignIn || userDetails.steamId === "76561198199195838") {
        event({
          category: "Auth",
          action: "Sign In Success New",
        });
        router.push("/finishprofile", "/finishprofile");
      } else {
        event({
          category: "Auth",
          action: "Sign In Success Returning",
        });
        router.push("/", "/");
      }
    })();
  }, [dispatch, router, displayToast, event]);
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
