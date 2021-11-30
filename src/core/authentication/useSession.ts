import useSWR, { SWRConfiguration } from "swr";
import { AuthApi } from "./AuthApi";

const fiveMinutesInMs = 5 * 60 * 1000;

export const sharedFetchConfig: SWRConfiguration = {
  dedupingInterval: fiveMinutesInMs,
  errorRetryCount: 2,
  focusThrottleInterval: fiveMinutesInMs,
};

const useSession = () => {
  async function sessionFetcher() {
    console.log("# useSession | Setting session cookie");
    const result = await AuthApi.setSessionCookie();
    console.log("# useSession | Is authed", result.authenticated);
    return result.authenticated;
  }

  const { data } = useSWR<boolean>(
    "session",
    sessionFetcher,
    sharedFetchConfig
  );

  return { isAuthenticated: Boolean(data) };
};

export const useAuthToken = (): string | null => {
  const { isAuthenticated } = useSession();

  async function fetchAuthToken() {
    console.log("# useAuthToken | Fetching token");
    const result = await AuthApi.refreshToken();
    console.log("# useAuthToken | Got access token");
    return result;
  }

  const { data } = useSWR<string>(
    isAuthenticated ? "authToken" : null,
    fetchAuthToken,
    sharedFetchConfig
  );

  return data || null;
};
