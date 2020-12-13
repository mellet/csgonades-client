import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "../../../core/api/TokenApi";
import { tokenExpiredOrAboutTo } from "../../../utils/TokenUtil";
import { tokenSelector } from "../AuthSelectors";
import { setTokenAction } from "../AuthSlice";

export const useGetOrUpdateToken = (): (() => Promise<string | null>) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const getToken = useCallback(async () => {
    if (!token) {
      return null;
    }

    const shouldRefresh = tokenExpiredOrAboutTo(token);

    if (!shouldRefresh) {
      return token;
    }

    const tokenResult = await AuthApi.refreshToken();

    if (tokenResult.isErr()) {
      return null;
    }

    dispatch(setTokenAction(tokenResult.value));

    return tokenResult.value;
  }, [token, dispatch]);

  return getToken;
};
