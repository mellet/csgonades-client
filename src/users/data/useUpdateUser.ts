import { useCallback } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useRouter } from "next/router";
import { useAuthToken } from "../../core/authentication/useSession";

export const useUpdateUser = () => {
  const router = useRouter();
  const authToken = useAuthToken();

  const updateUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      if (!steamId || !authToken) {
        console.warn("Not viewing a user or missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(
        steamId,
        updatedFields,
        authToken
      );

      if (result.isErr()) {
        router.reload();
        return;
      }

      // dispatch(setUserAction(result.value));
      // TODO: mutate useSignInUser
      router.reload();
    },
    [router, authToken]
  );

  return updateUser;
};
