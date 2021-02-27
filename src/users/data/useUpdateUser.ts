import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { setUserAction } from "../../core/authentication/AuthSlice";
import { useGetOrUpdateToken } from "../../core/authentication/useGetToken";
import { useRouter } from "next/router";

export const useUpdateUser = () => {
  const router = useRouter();
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();

  const updateUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      const token = await getToken();

      if (!steamId || !token) {
        console.warn("Not viewing a user or missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(steamId, updatedFields, token);

      if (result.isErr()) {
        router.reload();
        return;
      }

      dispatch(setUserAction(result.value));
      router.reload();
    },
    [dispatch, getToken, router]
  );

  return updateUser;
};
