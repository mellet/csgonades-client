import { useCallback } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useSession } from "../../core/authentication/useSession";

export const useFinishProfile = () => {
  const { isAuthenticated } = useSession();

  const finishProfile = useCallback(
    async (steamId: string, updatedField: UserUpdateDTO) => {
      if (!isAuthenticated) {
        console.error("Missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(steamId, updatedField);

      if (result.isErr()) {
        return;
      }

      // dispatch(setUserAction(result.value));
      // TODO: Mutate useSignedInUser
    },
    [isAuthenticated]
  );
  return finishProfile;
};
