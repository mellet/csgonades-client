import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { NotificationApi } from "../NotificationApi";

const useNotificationFetcher = () => {
  const fetchToken = useGetOrUpdateToken();

  return async () => {
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
  };
};

export const useRawNotifications = () => {
  const notificationFetchDelay = 5 * 60 * 1000;
  const fetchToken = useGetOrUpdateToken();
  const notificaitonFetcher = useNotificationFetcher();

  const { data } = useSWR("/notifications", notificaitonFetcher, {
    dedupingInterval: notificationFetchDelay,
    revalidateOnFocus: true,
    focusThrottleInterval: notificationFetchDelay,
  });

  const markAsViewed = useCallback(async () => {
    const freshToken = await fetchToken();

    if (!freshToken || !data) {
      return;
    }

    const viewed = data.map((n) => ({ ...n, viewed: true }));

    mutate("/notifications", viewed);
    await NotificationApi.markAllAsViewed(freshToken);
  }, [data, fetchToken]);

  return {
    rawNotifications: data || [],
    markAsViewed,
  };
};
