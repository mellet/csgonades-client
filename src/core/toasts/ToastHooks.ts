import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeNotificationAction } from "./ToastActions";

export const useDismissToast = () => {
  const dispatch = useDispatch();

  const dismissToast = useCallback(
    (id: string) => {
      dispatch(removeNotificationAction(id));
    },
    [dispatch]
  );

  return dismissToast;
};
