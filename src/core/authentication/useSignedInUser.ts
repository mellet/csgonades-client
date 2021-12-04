import { useCallback } from "react";
import useSWR from "swr";
import { UserApi } from "../../users/data/UserApi";
import { User, UserUpdateDTO } from "../../users/models/User";
import { useDisplayToast } from "../toasts/hooks/useDisplayToast";
import { sharedFetchConfig, useSession } from "./useSession";

export const useSignedInUser = () => {
  const { isAuthenticated } = useSession();
  const displayToast = useDisplayToast();

  async function fetchSignedInUser() {
    const user = await UserApi.fetchSelf();
    return user;
  }

  const { data, mutate, isValidating } = useSWR<User>(
    isAuthenticated ? "/user/self" : null,
    fetchSignedInUser,
    sharedFetchConfig
  );

  const isLoadingUser = !data && isValidating;

  const clearSignedInUser = useCallback(() => {
    mutate(undefined, false);
  }, [mutate]);

  const updatedSignedInUser = useCallback(
    async (steamId: string, updatedFields: UserUpdateDTO) => {
      if (!isAuthenticated) {
        return displayToast({
          message: "Failed to update user",
          severity: "error",
        });
      }

      mutate((prevData) => {
        if (!prevData) {
          return undefined;
        } else {
          return {
            ...prevData,
            nickname: updatedFields.nickname || prevData.nickname,
            bio: updatedFields.nickname || prevData.bio,
            email: updatedFields.email || prevData.email,
          };
        }
      });

      await UserApi.updateUser(steamId, updatedFields);

      mutate();
    },
    [mutate, displayToast, isAuthenticated]
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    isLoadingUser,
    signedInUser: data,
    clearSignedInUser,
    updatedSignedInUser,
    refetch,
  };
};
