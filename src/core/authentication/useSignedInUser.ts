import { useCallback } from "react";
import useSWR from "swr";
import { UserApi } from "../../users/data/UserApi";
import { User } from "../../users/models/User";
import { sharedFetchConfig, useSession } from "./useSession";

export const useSignedInUser = () => {
  const { isAuthenticated } = useSession();

  async function fetchSignedInUser() {
    const user = await UserApi.fetchSelf();
    return user;
  }

  const { data, mutate } = useSWR<User>(
    isAuthenticated ? "/user/self" : null,
    fetchSignedInUser,
    sharedFetchConfig
  );

  const clearSignedInUser = useCallback(() => {
    mutate(undefined, false);
  }, [mutate]);

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    signedInUser: data,
    clearSignedInUser,
    refetch,
  };
};
