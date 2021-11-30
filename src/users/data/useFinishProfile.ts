import { useCallback } from "react";
import { UserApi } from "./UserApi";
import { UserUpdateDTO } from "../models/User";
import { useAuthToken } from "../../core/authentication/useSession";

export const useFinishProfile = () => {
  const authToken = useAuthToken();

  const finishProfile = useCallback(
    async (steamId: string, updatedField: UserUpdateDTO) => {
      if (!authToken) {
        console.error("Missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(steamId, updatedField, authToken);

      if (result.isErr()) {
        return;
      }

      // dispatch(setUserAction(result.value));
      // TODO: Mutate useSignedInUser
    },
    [authToken]
  );
  return finishProfile;
};
