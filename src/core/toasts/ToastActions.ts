import { nanoid } from "nanoid";
import { capitalize } from "../../utils/Common";

export type ToastSeverity = "info" | "success" | "warning" | "error";

export type AppToastCreate = {
  id?: string;
  title?: string;
  message: string;
  severity: ToastSeverity;
  durationSeconds?: number;
};

export type AppToast = {
  id: string;
  title?: string;
  message: string;
  severity: ToastSeverity;
  durationSeconds: number;
};

type AddToastAction = {
  type: "@@notification/ADD";
  notification: AppToast;
};

type RemoveToastAction = {
  type: "@@notification/REMOVE";
  id: string;
};

export type ToastActions = AddToastAction | RemoveToastAction;

export const addNotificationAction = (
  notification: AppToastCreate
): AddToastAction => {
  const id = nanoid();
  const noti: AppToast = {
    ...notification,
    id,
    durationSeconds: notification.durationSeconds || 8,
    title: notification.title || capitalize(notification.severity),
  };
  return {
    type: "@@notification/ADD",
    notification: noti,
  };
};

export const removeNotificationAction = (id: string): RemoveToastAction => ({
  type: "@@notification/REMOVE",
  id,
});
