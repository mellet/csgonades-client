import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { UserApi } from "../../users/data/UserApi";
import { User } from "../../users/models/User";
import { useAuthToken, sharedFetchConfig } from "./useSession";

export const useSignedInUser = () => {
  const authToken = useAuthToken();
  const { mutate } = useSWRConfig();

  async function fetchSignedInUser(_: string, token: string) {
    const user = await UserApi.fetchSelf(token);
    return user;
  }

  const { data } = useSWR<User>(
    authToken ? ["user", authToken] : null,
    fetchSignedInUser,
    sharedFetchConfig
  );

  const signOut = useCallback(() => {
    // Clear user token
    mutate(["user", authToken], null, false);
    // Reset session for expired cookie
    mutate("session");
    // Clear token
    mutate("token");
  }, [authToken, mutate]);

  return {
    signedInUser: data,
    signOut,
  };
};
