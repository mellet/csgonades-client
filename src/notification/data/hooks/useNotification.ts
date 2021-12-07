import { useCallback } from "react";
import useSWR from "swr";
import { useSession } from "../../../core/authentication/useSession";
import { NotificationApi } from "../NotificationApi";

async function fetchNotifications() {
  const result = await NotificationApi.getNotifications();

  if (result.isOk()) {
    return result.value;
  } else {
    throw Error(result.error.message);
  }
}

export const useRawNotifications = () => {
  const twentyMinutesInMs = 20 * 60 * 1000;
  const { isAuthenticated } = useSession();

  const { data: rawNotification, mutate } = useSWR(
    "/notifications",
    fetchNotifications,
    {
      dedupingInterval: twentyMinutesInMs,
      revalidateOnFocus: true,
      focusThrottleInterval: twentyMinutesInMs,
    }
  );

  const markAsViewed = useCallback(async () => {
    if (!isAuthenticated || !rawNotification) {
      return;
    }

    const unviewedCount = rawNotification.filter((n) => !n.viewed).length;

    if (unviewedCount) {
      const viewed = rawNotification.map((n) => ({ ...n, viewed: true }));

      mutate(viewed);
      await NotificationApi.markAllAsViewed();
    }
  }, [rawNotification, mutate, isAuthenticated]);

  return {
    rawNotifications: rawNotification || [],
    markAsViewed,
  };
};
