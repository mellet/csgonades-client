import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationApi } from "../NotificationApi";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { lastNotificationFetchSelector } from "../NotificationSelectors";
import { dateMinutesAgo } from "../../../utils/DateUtils";
import { useIsSignedIn } from "../../../core/authentication/useIsSignedIn";
import { addUnreadNotificationsAction } from "../NotificationSlice";

export const useFetchNotifications = () => {
  const dispatch = useDispatch();
  const getToken = useGetOrUpdateToken();
  const isSignedIn = useIsSignedIn();
  const lastNotificationFetch = useSelector(lastNotificationFetchSelector);

  const fetchNotifications = useCallback(async () => {
    const authToken = await getToken();

    if (!authToken) {
      return;
    }

    const result = await NotificationApi.getNotifications(authToken);

    if (result.isErr()) {
      console.error(result.error);
      return;
    }
    dispatch(addUnreadNotificationsAction(result.value));
  }, [dispatch, getToken]);

  useEffect(() => {
    if (!lastNotificationFetch || !isSignedIn) {
      return;
    }

    const mintutesAgoLastFetch = dateMinutesAgo(lastNotificationFetch);

    if (mintutesAgoLastFetch < 5) {
      return;
    }

    fetchNotifications();
  }, [isSignedIn, lastNotificationFetch, fetchNotifications]);
};
