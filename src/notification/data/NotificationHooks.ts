import { useMemo } from "react";
import {
  FavoriteNotification,
  FavoriteNotificationAgregate,
} from "../models/Notification";
import { useRawNotifications } from "./hooks/useNotification";

type NotificationAggregateMap = { [key: string]: FavoriteNotificationAgregate };

function combineFavoriteNotifications(notis: FavoriteNotification[]) {
  let aggregatedFavorites: NotificationAggregateMap = {};

  for (const favNoti of notis) {
    const favForNadeId = favNoti.nadeId;
    const found = aggregatedFavorites[favForNadeId];
    if (found) {
      const newestTime =
        favNoti.createdAt.getTime() > found.createdAt.getTime()
          ? favNoti.createdAt
          : found.createdAt;

      aggregatedFavorites = {
        ...aggregatedFavorites,
        [favForNadeId]: {
          ...found,
          count: found.count + 1,
          viewed: favNoti.viewed ? found.viewed : favNoti.viewed,
          createdAt: newestTime,
        },
      };
    } else {
      aggregatedFavorites = {
        ...aggregatedFavorites,
        [favForNadeId]: {
          id: favNoti.id,
          byNickname: favNoti.byNickname,
          count: 1,
          type: "favorite-agregate",
          viewed: favNoti.viewed,
          createdAt: favNoti.createdAt,
          nadeId: favNoti.nadeId,
          nadeSlug: favNoti.nadeSlug,
          thumnailUrl: favNoti.thumnailUrl,
        },
      };
    }
  }

  return Object.values(aggregatedFavorites);
}

export const useNotifications = () => {
  const { rawNotifications, markAsViewed } = useRawNotifications();

  const { notificationCount, notifications } = useMemo(() => {
    // Split favorite notifications from other notifications
    const onlyFavorites = rawNotifications.filter(
      (n) => n.type === "favorite"
    ) as FavoriteNotification[];
    const otherNotifications = rawNotifications.filter(
      (n) => n.type !== "favorite"
    );

    // Combine notifications on same nade
    const aggregatedFavorites = combineFavoriteNotifications(onlyFavorites);

    const notifications = [...otherNotifications, ...aggregatedFavorites];
    notifications.sort((a, b) => dateSort(a.createdAt, b.createdAt));

    const notificationCount = notifications.filter((n) => !n.viewed).length;

    return {
      notifications,
      notificationCount,
    };
  }, [rawNotifications]);

  return {
    notifications,
    notificationCount,
    setAllNotificationsAsViewed: markAsViewed,
  };
};

function dateSort(a: Date | string, b: Date | string) {
  const aDate = typeof a === "string" ? new Date(a) : a;
  const bDate = typeof b === "string" ? new Date(b) : b;

  return bDate.getTime() - aDate.getTime();
}
