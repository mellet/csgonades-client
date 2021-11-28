import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useToast } from "../../../shared-components/toast/useToast";
import { capitalize } from "../../../utils/Common";
import { AppToast, AppToastCreate } from "../ToastModels";

export const useDisplayToast = () => {
  const { addToast, removeToast } = useToast();

  const displayToast = useCallback(
    async (notification: AppToastCreate) => {
      const toast = createToast(notification);
      addToast(toast);
      await notificationDeleteDelay(notification.durationSeconds);
      removeToast(toast.id);
    },
    [addToast, removeToast]
  );

  return displayToast;
};

const notificationDeleteDelay = (seconds?: number) => {
  const time = seconds ? seconds * 1000 : 8 * 1000;
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
};

function createToast(createToast: AppToastCreate): AppToast {
  const id = nanoid();
  const noti: AppToast = {
    ...createToast,
    id,
    durationSeconds: createToast.durationSeconds || 8,
    title: createToast.title || capitalize(createToast.severity),
  };
  return noti;
}
