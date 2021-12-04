import { useCallback } from "react";
import { UserUpdateDTO } from "../models/User";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";

export const useFinishProfile = () => {
  const { signedInUser, updatedSignedInUser } = useSignedInUser();
  const displayToast = useDisplayToast();

  const finishProfile = useCallback(
    async (steamId: string, updatedField: UserUpdateDTO) => {
      if (!signedInUser) {
        return displayToast({
          severity: "error",
          message: "Seems like you are not signed in",
        });
      }

      await updatedSignedInUser(steamId, updatedField);
    },
    [signedInUser, displayToast, updatedSignedInUser]
  );
  return finishProfile;
};
