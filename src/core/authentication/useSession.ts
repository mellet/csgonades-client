import { useCallback } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { AuthApi } from "./AuthApi";

export const fiveMinutesInMs = 5 * 60 * 1000;

export const sharedFetchConfig: SWRConfiguration = {
  dedupingInterval: fiveMinutesInMs,
  errorRetryCount: 2,
  focusThrottleInterval: fiveMinutesInMs,
  revalidateOnFocus: false,
};

export const useSession = () => {
  async function sessionFetcher() {
    console.log("# useSession | Setting session cookie");
    const result = await AuthApi.setSessionCookie();
    console.log("# useSession | Is authed", result.authenticated);
    return result.authenticated;
  }

  const { data, mutate } = useSWR<boolean>(
    "session",
    sessionFetcher,
    sharedFetchConfig
  );

  const clearSession = useCallback(() => {
    mutate(false, false);
  }, [mutate]);

  return { isAuthenticated: Boolean(data), clearSession };
};
