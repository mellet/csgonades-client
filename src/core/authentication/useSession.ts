import { useCallback } from "react";
import useSWR from "swr";
import { AuthApi } from "./AuthApi";

export const useSession = () => {
  async function sessionFetcher() {
    const result = await AuthApi.setSessionCookie();
    return result.authenticated;
  }

  const { data, mutate } = useSWR<boolean>("session", sessionFetcher, {
    dedupingInterval: 5 * 60 * 1000,
  });

  const clearSession = useCallback(() => {
    mutate(false, false);
  }, [mutate]);

  return { isAuthenticated: Boolean(data), clearSession };
};
