import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import {
  useGetOrUpdateToken,
  useToken,
} from "../../../core/authentication/useGetToken";
import { NotificationApi } from "../NotificationApi";

async function fetcher(_key: string, fetchToken: () => Promise<string | null>) {
  console.log("# Getting token to fetch notifications", new Date());
  const token = await fetchToken();

  if (!token) {
    return;
  }

  console.log("#Fetching notification", new Date());
  const result = await NotificationApi.getNotifications(token);

  if (result.isOk()) {
    return result.value;
  } else {
    throw Error(result.error.message);
  }
}

export const useRawNotifications = () => {
  const notificationFetchDelay = 5 * 60 * 1000;
  const token = useToken();
  const fetchToken = useGetOrUpdateToken();

  const { data } = useSWR(
    token ? ["/notifications", fetchToken] : null,
    fetcher,
    {
      dedupingInterval: notificationFetchDelay,
      revalidateOnFocus: true,
      focusThrottleInterval: notificationFetchDelay,
    }
  );

  const markAsViewed = useCallback(async () => {
    if (!token || !data) {
      return;
    }

    const viewed = data.map((n) => ({ ...n, viewed: true }));

    mutate(["/notifications", token], viewed);

    await NotificationApi.markAllAsViewed(token);

    mutate(["/notifications", token]);
  }, [token, data]);

  return {
    rawNotifications: data || [],
    markAsViewed,
  };
};
