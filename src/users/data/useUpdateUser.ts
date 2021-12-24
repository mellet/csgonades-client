import { useCallback, useState } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useRouter } from "next/router";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { useGa } from "../../utils/Analytics";
import { useUser } from "./useUser";

export const useUpdateUser = (steamId: string) => {
  const ga = useGa();
  const router = useRouter();
  const { refetch } = useSignedInUser();
  const displayToast = useDisplayToast();
  const { signedInUser } = useSignedInUser();
  const { refetchUser } = useUser(steamId);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

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
      setIsUpdatingUser(true);
      const result = await UserApi.updateUser(steamId, updatedFields);

      if (result.isErr()) {
        setIsUpdatingUser(false);
        return displayToast({
          message: `Try again later. Error: ${result.error.message}`,
          severity: "error",
          title: "Failed to update user",
        });
      }

      displayToast({
        message: "Successfully updated profile.",
        severity: "success",
        title: "Updated user",
      });

      ga.event({
        category: "user_page",
        action: "click_update_user",
      });

      refetch();
      refetchUser();

      setIsUpdatingUser(false);

      router.push(`/users/${steamId}`);
    },
    [router, refetch, signedInUser, displayToast, ga, refetchUser]
  );

  return { updateUser, isUpdatingUser };
};
