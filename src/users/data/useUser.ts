import useSWR from "swr";
import { User } from "../models/User";
import { UserApi } from "./UserApi";

async function fetchUser(_url: string, steamId: string) {
  const result = await UserApi.fetchUser(steamId);

  if (result.isErr()) {
    throw result.error;
  }

  return result.value;
}

type UserState =
  | { user: User; isLoading: false; refetchUser: () => void }
  | { user: undefined; isLoading: true; refetchUser: () => void };

export const useUser = (steamId: string): UserState => {
  const { data, mutate, isValidating } = useSWR(["user", steamId], fetchUser);

  if (!data && isValidating) {
    return {
      isLoading: true,
      user: undefined,
      refetchUser: mutate,
    };
  }

  if (data) {
    return {
      isLoading: false,
      user: data,
      refetchUser: mutate,
    };
  } else {
    return {
      isLoading: true,
      user: undefined,
      refetchUser: mutate,
    };
  }
};
