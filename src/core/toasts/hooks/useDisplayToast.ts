import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addNotificationAction,
  AppToastCreate,
  removeNotificationAction,
} from "../ToastActions";

export const useDisplayToast = () => {
  const dispatch = useDispatch();

  const displayToast = useCallback(
    async (notification: AppToastCreate) => {
      const addAction = addNotificationAction(notification);
      const removeAction = removeNotificationAction(addAction.notification.id);
      dispatch(addAction);
      await notificationDeleteDelay(notification.durationSeconds);
      dispatch(removeAction);
    },
    [dispatch]
  );

  return displayToast;
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
};
