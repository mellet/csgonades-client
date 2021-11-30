import { useCallback } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useRouter } from "next/router";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { useSession } from "../../core/authentication/useSession";

export const useUpdateUser = () => {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const { refetch } = useSignedInUser();

  const updateUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      if (!steamId || !isAuthenticated) {
        console.warn("Not viewing a user or missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(steamId, updatedFields);

      if (result.isErr()) {
        router.reload();
        return;
      }

      refetch();
      router.reload();
    },
    [router, refetch, isAuthenticated]
  );

  return updateUser;
};
