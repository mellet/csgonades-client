import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { useAuthToken } from "../../../core/authentication/useSession";
import { NotificationApi } from "../NotificationApi";

export const useRawNotifications = () => {
  const notificationFetchDelay = 5 * 60 * 1000;
  const authToken = useAuthToken();

  async function fetchNotifications(_: string, token: string) {
    if (!token) {
      return [];
    }
    console.log("#Fetching notification", new Date());
    const result = await NotificationApi.getNotifications(token);

    if (result.isOk()) {
      return result.value;
    } else {
      throw Error(result.error.message);
    }
  }

  const { data: rawNotification } = useSWR(
    ["/notifications", authToken],
    fetchNotifications,
    {
      dedupingInterval: notificationFetchDelay,
      revalidateOnFocus: true,
      focusThrottleInterval: notificationFetchDelay,
    }
  );

  const markAsViewed = useCallback(async () => {
    if (!authToken || !rawNotification) {
      return;
    }

    const viewed = rawNotification.map((n) => ({ ...n, viewed: true }));

    mutate("/notifications", viewed);
    await NotificationApi.markAllAsViewed(authToken);
  }, [rawNotification, authToken]);

  return {
    rawNotifications: rawNotification || [],
    markAsViewed,
  };
};
