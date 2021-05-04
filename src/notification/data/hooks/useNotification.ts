import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import { useToken } from "../../../core/authentication/useGetToken";
import { NotificationApi } from "../NotificationApi";

async function fetcher(_key: string, token: string) {
  console.log("#Fetching notification");
  const result = await NotificationApi.getNotifications(token);

  if (result.isOk()) {
    return result.value;
  } else {
    throw Error(result.error.message);
  }
}

export const useRawNotifications = () => {
  const token = useToken();

  const { data } = useSWR(token ? ["/notifications", token] : null, fetcher, {
    dedupingInterval: 60 * 1000,
  });

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
