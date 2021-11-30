import { useCallback } from "react";
import useSWR from "swr";
import { useSession } from "../../../core/authentication/useSession";
import { NotificationApi } from "../NotificationApi";

async function fetchNotifications() {
  const result = await NotificationApi.getNotifications();

  if (result.isOk()) {
    console.log("#Fetching notification", result.value.length);
    return result.value;
  } else {
    throw Error(result.error.message);
  }
}

export const useRawNotifications = () => {
  const notificationFetchDelay = 5 * 60 * 1000;
  const { isAuthenticated } = useSession();

  const { data: rawNotification, mutate } = useSWR(
    "/notifications",
    fetchNotifications,
    {
      dedupingInterval: notificationFetchDelay,
      revalidateOnFocus: true,
      focusThrottleInterval: notificationFetchDelay,
    }
  );

  const markAsViewed = useCallback(async () => {
    if (!isAuthenticated || !rawNotification) {
      return;
    }

    const viewed = rawNotification.map((n) => ({ ...n, viewed: true }));

    mutate(viewed);
    await NotificationApi.markAllAsViewed();
  }, [rawNotification, mutate, isAuthenticated]);

  return {
    rawNotifications: rawNotification || [],
    markAsViewed,
  };
};
