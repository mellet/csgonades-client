import { useCallback } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useRouter } from "next/router";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";

export const useUpdateUser = () => {
  const router = useRouter();
  const { refetch } = useSignedInUser();
  const displayToast = useDisplayToast();
  const { signedInUser } = useSignedInUser();

  const updateUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      if (!steamId || !signedInUser) {
        return displayToast({
          message:
            "Unexpected error, please contact us on Discord if you continue to see this error.",
          severity: "error",
          title: "Failed to update user",
        });
      }

      const result = await UserApi.updateUser(steamId, updatedFields);

      if (result.isErr()) {
        router.reload();
        return;
      }

      refetch();
      router.reload();
    },
    [router, refetch, signedInUser, displayToast]
  );

  return updateUser;
};
